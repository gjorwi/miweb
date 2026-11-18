import { getAdminToken, getApiUrl, getUpstreamJson, jsonNoStore } from "@/lib/admin-bff";

export const runtime = "nodejs";

async function forwardAdminRequest(path, options = {}) {
  const token = await getAdminToken();
  if (!token) return jsonNoStore({ ok: false, code: "UNAUTHORIZED", message: "Inicia sesión para continuar." }, 401);

  let upstream;
  try {
    upstream = await fetch(`${getApiUrl()}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      cache: "no-store",
    });
  } catch {
    return jsonNoStore({ ok: false, message: "No se pudo conectar con la API." }, 502);
  }

  const result = await getUpstreamJson(upstream);
  return jsonNoStore(result, upstream.status);
}

export async function GET(request) {
  const search = new URL(request.url).search;
  return forwardAdminRequest(`/api/admin/messages${search}`);
}

export async function PATCH(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonNoStore({ ok: false, message: "Solicitud inválida." }, 400);
  }

  if (typeof body.id !== "string" || !/^[a-f\d]{24}$/i.test(body.id) || typeof body.isRead !== "boolean") {
    return jsonNoStore({ ok: false, message: "Datos de actualización inválidos." }, 400);
  }

  return forwardAdminRequest(`/api/admin/messages/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify({ isRead: body.isRead }),
  });
}
