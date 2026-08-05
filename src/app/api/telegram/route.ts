import { NextResponse } from "next/server";
import { handleUpdate, type Update } from "@/lib/bot";
import { getWebhookInfo, setWebhook } from "@/lib/telegram";

/**
 * Webhook для Telegram-бота.
 * Vercel вызывает этот роут при каждом сообщении пользователя в боте.
 *
 * URL webhook настраивается один раз:
 *   GET /api/telegram?setup=webhook&secret=<WEBHOOK_SECRET>
 * Или вручную:
 *   https://api.telegram.org/bot<TOKEN>/setWebhook?url=<VERCEL_URL>/api/telegram
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const update = (await req.json()) as Update;
    // Не блокируем ответ — обрабатываем асинхронно,
    // чтобы Telegram не повторял запросы.
    await handleUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

/**
 * GET — диагностика и настройка webhook.
 * - Просто GET: показывает статус webhook.
 * - GET ?setup=webhook&secret=<WEBHOOK_SECRET>: настраивает webhook на текущий URL.
 */
export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // Настройка webhook
  if (url.searchParams.get("setup") === "webhook") {
    const secret = process.env.WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "WEBHOOK_SECRET не задан" },
        { status: 500 }
      );
    }
    if (url.searchParams.get("secret") !== secret) {
      return NextResponse.json(
        { ok: false, error: "Неверный secret" },
        { status: 401 }
      );
    }
    const base = `${url.protocol}//${url.host}`;
    const webhookUrl = `${base}/api/telegram`;
    const ok = await setWebhook(webhookUrl);
    return NextResponse.json({
      ok,
      message: ok ? `Webhook установлен: ${webhookUrl}` : "Не удалось установить webhook",
      webhookUrl,
    });
  }

  // Диагностика
  const info = await getWebhookInfo();
  return NextResponse.json({
    ok: true,
    message: "Telegram webhook endpoint is running",
    botTokenSet: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    webhookInfo: info,
  });
}
