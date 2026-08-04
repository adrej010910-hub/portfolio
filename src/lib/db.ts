import { services } from "@/config/site";

// =====================================================
// Хранилище данных (статистика, заказы, состояния диалогов)
// =====================================================
// Использует Upstash Redis REST API (Vercel KV) через fetch —
// БЕЗ дополнительных зависимостей. Если переменные KV не заданы,
// работает в in-memory режиме (полезно для локальной разработки).
//
// Для Vercel: создайте KV Store в панели Vercel и подключите его к
// проекту — переменные KV_REST_API_URL / KV_REST_API_TOKEN будут
// добавлены автоматически.
// =====================================================

export type OrderSource = "site" | "bot";

export type OrderInput = {
  name: string;
  email?: string;
  telegram: string;
  service: string;
  budget: string;
  message: string;
  source: OrderSource;
};

export type Order = OrderInput & { id: number; createdAt: number };

export type Stats = {
  total: number;
  today: number;
  week: number;
  byService: Record<string, number>;
  bySource: Record<string, number>;
  recent: Order[];
};

export type DialogState = {
  step: string;
  data: Partial<OrderInput>;
};

// -----------------------------------------------------
// Redis REST (Upstash) или in-memory fallback
// -----------------------------------------------------
const REST_URL = (process.env.KV_REST_API_URL ?? "").replace(/\/+$/, "");
const REST_TOKEN = process.env.KV_REST_API_TOKEN ?? "";
const hasRedis = Boolean(REST_URL && REST_TOKEN);

const memory = new Map<string, string | number | string[]>();

async function request(
  command: string,
  args: (string | number)[],
  method: "GET" | "POST" = "GET"
): Promise<unknown> {
  const path = `/${command}/${args.map((a) => encodeURIComponent(String(a))).join("/")}`;
  const res = await fetch(`${REST_URL}${path}`, {
    method,
    headers: REST_TOKEN ? { Authorization: `Bearer ${REST_TOKEN}` } : undefined,
  });
  if (!res.ok) throw new Error(`KV ${command} failed: ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function get(key: string): Promise<string | null> {
  if (hasRedis) return (await request("get", [key])) as string | null;
  const v = memory.get(key);
  return v == null ? null : String(v);
}

async function set(key: string, value: string): Promise<void> {
  if (hasRedis) {
    await request("set", [key, value], "POST");
    return;
  }
  memory.set(key, value);
}

async function del(key: string): Promise<void> {
  if (hasRedis) {
    await request("del", [key], "POST");
    return;
  }
  memory.delete(key);
}

async function incr(key: string): Promise<number> {
  if (hasRedis) return Number(await request("incr", [key], "POST"));
  const next = Number(memory.get(key) ?? 0) + 1;
  memory.set(key, next);
  return next;
}

async function rpush(key: string, value: string): Promise<void> {
  if (hasRedis) {
    await request("rpush", [key, value], "POST");
    return;
  }
  const arr = (memory.get(key) as string[] | undefined) ?? [];
  arr.push(value);
  memory.set(key, arr);
}

async function lrange(key: string): Promise<string[]> {
  if (hasRedis) return ((await request("lrange", [key, 0, -1])) as string[]) ?? [];
  return (memory.get(key) as string[] | undefined) ?? [];
}

async function ltrim(key: string, keep: number): Promise<void> {
  if (hasRedis) {
    await request("ltrim", [key, -keep, -1], "POST");
    return;
  }
  const arr = (memory.get(key) as string[] | undefined) ?? [];
  memory.set(key, arr.slice(-keep));
}

// -----------------------------------------------------
// Работа с датами
// -----------------------------------------------------
function dayKeyOffset(daysAgo = 0): string {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  return d.toISOString().slice(0, 10);
}

// -----------------------------------------------------
// Заказы
// -----------------------------------------------------
const RECENT_LIMIT = 30;

export async function addOrder(input: OrderInput): Promise<Order> {
  const id = await incr("counter:orders");
  const order: Order = { ...input, id, createdAt: Date.now() };

  const day = dayKeyOffset(0);
  await incr("stat:total");
  await incr(`stat:day:${day}`);
  await incr(`stat:service:${input.service}`);
  await incr(`stat:source:${input.source}`);

  await rpush("orders:recent", JSON.stringify(order));
  await ltrim("orders:recent", RECENT_LIMIT);

  return order;
}

const dayKeys = Array.from({ length: 7 }, (_, i) => dayKeyOffset(i));

export async function getStats(): Promise<Stats> {
  const [total, today, weekNum, siteCount, botCount] = await Promise.all([
    Number((await get("stat:total")) ?? 0),
    Number((await get(`stat:day:${dayKeys[0]}`)) ?? 0),
    (async () => {
      let sum = 0;
      for (const k of dayKeys) sum += Number((await get(`stat:day:${k}`)) ?? 0);
      return sum;
    })(),
    Number((await get("stat:source:site")) ?? 0),
    Number((await get("stat:source:bot")) ?? 0),
  ]);

  const byService: Record<string, number> = {};
  for (const svc of services) {
    const count = Number((await get(`stat:service:${svc.title}`)) ?? 0);
    if (count > 0) byService[svc.title] = count;
  }

  const recentRaw = await lrange("orders:recent");
  const recent = recentRaw
    .map((r) => {
      try {
        return JSON.parse(r) as Order;
      } catch {
        return null;
      }
    })
    .filter((o): o is Order => o !== null)
    .reverse();

  return {
    total,
    today,
    week: weekNum,
    byService,
    bySource: { site: siteCount, bot: botCount },
    recent,
  };
}

// -----------------------------------------------------
// Администраторы (владелец)
// -----------------------------------------------------
function envAdminIds(): number[] {
  return (process.env.TELEGRAM_ADMIN_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

export async function getAdminIds(): Promise<number[]> {
  const ids = new Set<number>();
  envAdminIds().forEach((id) => ids.add(id));
  const kvRaw = (await get("admins")) ?? "";
  kvRaw
    .split(",")
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
    .forEach((id) => ids.add(id));
  return [...ids];
}

export async function isAdmin(chatId: number): Promise<boolean> {
  return (await getAdminIds()).includes(chatId);
}

/**
 * Отправляет уведомление о новом заказе всем администраторам.
 * Используется как из API-роута сайта, так и из бота.
 */
export async function sendOrderNotification(order: Order): Promise<void> {
  const ids = await getAdminIds();
  if (ids.length === 0) return;

  const { sendMessage, escapeHtml } = await import("@/lib/telegram");
  const lines = [
    `🧾 <b>Новый заказ</b>`,
    `━━━━━━━━━━━━`,
    `👤 <b>Имя:</b> ${escapeHtml(order.name)}`,
    `📱 <b>Telegram:</b> ${escapeHtml(order.telegram)}`,
    `🛠 <b>Услуга:</b> ${escapeHtml(order.service)}`,
    `💰 <b>Бюджет:</b> ${escapeHtml(order.budget)}`,
    `📝 <b>Описание:</b> ${escapeHtml(order.message)}`,
    `🌐 <b>Источник:</b> ${order.source === "site" ? "Сайт" : "Telegram-бот"}`,
    `━━━━━━━━━━━━`,
    `⚡ Заявка с портфолио`,
  ];

  for (const id of ids) await sendMessage(id, lines.join("\n"));
}

export async function registerAdmin(chatId: number): Promise<void> {
  if ((await getAdminIds()).includes(chatId)) return;
  // Если администратор задан только в env — не дублируем в KV,
  // но для простоты регистрируем первого пользователя бота в KV.
  const list = (await get("admins")) ?? "";
  const updated = list ? `${list},${chatId}` : String(chatId);
  await set("admins", updated);
}

// -----------------------------------------------------
// Диалоговые состояния
// -----------------------------------------------------
export async function getDialog(chatId: number): Promise<DialogState | null> {
  const raw = await get(`dialog:${chatId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DialogState;
  } catch {
    return null;
  }
}

export async function setDialog(chatId: number, state: DialogState): Promise<void> {
  await set(`dialog:${chatId}`, JSON.stringify(state));
}

export async function clearDialog(chatId: number): Promise<void> {
  await del(`dialog:${chatId}`);
}

