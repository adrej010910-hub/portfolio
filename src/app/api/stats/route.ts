import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";

/**
 * API-роут статистики для владельца.
 * Защищён простым токеном в заголовке (STATS_API_TOKEN).
 *
 * Пример запроса:
 *   GET /api/stats
 *   Authorization: Bearer <STATS_API_TOKEN>
 */
export async function GET(req: Request): Promise<Response> {
  const token = process.env.STATS_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "STATS_API_TOKEN не настроен" },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Недостаточно прав" }, { status: 401 });
  }

  try {
    const stats = await getStats();
    return NextResponse.json({ ok: true, stats });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
