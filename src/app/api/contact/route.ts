import { NextResponse } from "next/server";
import { addOrder, sendOrderNotification, type OrderInput } from "@/lib/db";

/**
 * API-роут приёма заявок с формы сайта.
 * Принимает POST с данными формы, сохраняет заявку и
 * отправляет уведомление владельцу в Telegram.
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Partial<OrderInput>;

    const name = (body.name ?? "").trim();
    const telegram = (body.telegram ?? "").trim();
    const service = (body.service ?? "Не указано").trim();
    const budget = (body.budget ?? "Не указано").trim();
    const message = (body.message ?? "").trim();

    if (!name || !telegram || !message) {
      return NextResponse.json(
        { ok: false, error: "Заполните имя, Telegram и описание проекта" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Опишите проект подробнее (от 10 символов)" },
        { status: 400 }
      );
    }

    const order = await addOrder({
      name,
      email: body.email?.trim() || undefined,
      telegram,
      service,
      budget,
      message,
      source: "site",
    });

    // Отправляем уведомление владельцу (не критично, если не отправится)
    await sendOrderNotification(order);

    return NextResponse.json({ ok: true, id: order.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
