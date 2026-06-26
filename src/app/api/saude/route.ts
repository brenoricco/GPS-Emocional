import { NextResponse } from "next/server";

/**
 * Health check endpoint. Railway, Vercel ou qualquer CDN usa pra detectar
 * se o app subiu. Não consulta o banco (pra responder rápido); se quiser
 * incluir DB check, troque por uma query simples.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { status: "ok", servico: "gps-emocional", timestamp: new Date().toISOString() },
    { status: 200 },
  );
}
