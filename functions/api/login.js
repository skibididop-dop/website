import { jsonResponse, parseBody, sha256 } from "../_utils/auth.js";

export async function onRequestPost(context) {
  const body = await parseBody(context.request);

  if (!body?.username || !body?.password) {
    return jsonResponse({ message: "Vui lòng nhập tài khoản và mật khẩu." }, 400);
  }

  const username = body.username.trim();
  const hash = await sha256(body.password);

  const row = await context.env.DB.prepare(
    "SELECT id, username, role FROM users WHERE username = ? AND password_hash = ?"
  )
    .bind(username, hash)
    .first();

  if (!row) {
    return jsonResponse({ message: "Sai tài khoản hoặc mật khẩu." }, 401);
  }

  return jsonResponse({
    message: `Chào mừng ${row.username}!`,
    user: row,
    isAdmin: row.role === "admin",
  }, 200);
}
