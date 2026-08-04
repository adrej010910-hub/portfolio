// =====================================================
// Telegram Bot API — минимальный клиент поверх fetch
// =====================================================

const BOT_TOKEN = () => process.env.TELEGRAM_BOT_TOKEN ?? "";

function apiUrl(method: string): string {
  return `https://api.telegram.org/bot${BOT_TOKEN()}/${method}`;
}

export async function sendMessage(
  chatId: number | string,
  text: string,
  extra: Record<string, unknown> = {}
): Promise<boolean> {
  if (!BOT_TOKEN()) {
    console.warn("TELEGRAM_BOT_TOKEN не задан — сообщение не отправлено");
    return false;
  }
  try {
    const res = await fetch(apiUrl("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(chatId),
        text,
        parse_mode: "HTML",
        ...extra,
      }),
    });
    const data = (await res.json()) as { ok?: boolean };
    return data.ok === true;
  } catch (err) {
    console.error("sendMessage error:", err);
    return false;
  }
}

export async function setWebhook(url: string): Promise<boolean> {
  if (!BOT_TOKEN()) return false;
  try {
    const res = await fetch(apiUrl("setWebhook"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, allowed_updates: ["message"] }),
    });
    const data = (await res.json()) as { ok?: boolean };
    return data.ok === true;
  } catch (err) {
    console.error("setWebhook error:", err);
    return false;
  }
}

export async function getWebhookInfo(): Promise<Record<string, unknown> | null> {
  if (!BOT_TOKEN()) return null;
  try {
    const res = await fetch(apiUrl("getWebhookInfo"));
    const data = (await res.json()) as { ok?: boolean; result?: Record<string, unknown> };
    return data.result ?? null;
  } catch {
    return null;
  }
}

/** Экранирование HTML-спецсимволов для parse_mode=HTML */
export function escapeHtml(value: string): string {
  const amp = String.fromCharCode(38) + "amp;";
  const lt = String.fromCharCode(38) + "lt;";
  const gt = String.fromCharCode(38) + "gt;";
  const quot = String.fromCharCode(38) + "quot;";
  return String(value)
    .replace(/&/g, amp)
    .replace(/</g, lt)
    .replace(/>/g, gt)
    .replace(/"/g, quot);
}
