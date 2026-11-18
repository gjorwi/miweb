import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getApiUrl, getUpstreamJson, jsonNoStore } from "@/lib/admin-bff";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonNoStore({ ok: false, message: "Solicitud inválida." }, 400);
  }

  if (!body || typeof body.code !== "string" || body.code.length < 1 || body.code.length > 256) {
    return jsonNoStore({ ok: false, message: "Ingresa el código de acceso." }, 400);
  }

  let upstream;
  try {
    upstream = await fetch(`${getApiUrl()}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: body.code }),
      cache: "no-store",
    });
  } catch {
    return jsonNoStore({ ok: false, message: "No se pudo conectar con la API." }, 502);
  }

  const result = await getUpstreamJson(upstream);
  if (!upstream.ok || typeof result.token !== "string") {
    return jsonNoStore({ ok: false, code: result.code, message: result.message || "No se pudo iniciar sesión." }, upstream.status || 502);
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  response.cookies.set(ADMIN_COOKIE_NAME, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 2 * 60 * 60,
  });
  return response;
}
