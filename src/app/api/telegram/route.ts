import { NextResponse } from "next/server";
import { handleUpdate, type Update } from "@/lib/bot";

/**
 * Webhook для Telegram-бота.
 * Vercel вызывает этот роут при каждом сообщении пользователя в боте.
 *
 * URL webhook настраивается один раз:
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

/** GET используется для диагностики — показывает что webhook работает. */
export async function GET(): Promise<Response> {
  return NextResponse.json({
    ok: true,
    message: "Telegram webhook endpoint is running",
    botTokenSet: Boolean(process.env.TELEGRAM_BOT_TOKEN),
  });
}
