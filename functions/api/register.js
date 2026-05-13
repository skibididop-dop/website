import { jsonResponse, parseBody, sha256 } from "../_utils/auth.js";

export async function onRequestPost(context) {
  const body = await parseBody(context.request);

  if (!body?.username || !body?.password || !body?.confirmPassword) {
    return jsonResponse({ message: "Vui lòng nhập đầy đủ thông tin." }, 400);
  }

  if (body.password !== body.confirmPassword) {
    return jsonResponse({ message: "Mật khẩu nhập lại không khớp." }, 400);
  }

  const username = body.username.trim();
  if (username.length < 4 || body.password.length < 6) {
    return jsonResponse({ message: "Tài khoản tối thiểu 4 ký tự, mật khẩu tối thiểu 6 ký tự." }, 400);
  }

  const hash = await sha256(body.password);

  try {
    await context.env.DB.prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, 'user')")
      .bind(username, hash)
      .run();

    return jsonResponse({ message: "Đăng ký thành công!" }, 201);
  } catch (error) {
    if (String(error).includes("UNIQUE")) {
      return jsonResponse({ message: "Tài khoản đã tồn tại." }, 409);
    }

    return jsonResponse({ message: "Lỗi máy chủ, vui lòng thử lại." }, 500);
  }
}
