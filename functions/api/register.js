import { jsonResponse, parseBody, sha256 } from "../_utils/auth.js";

export async function onRequestPost(context) {
  const body = await parseBody(context.request);

  // Validation
  if (!body?.username || !body?.password || !body?.confirmPassword) {
    return jsonResponse({ message: "Vui lòng nhập đầy đủ thông tin." }, 400);
  }

  if (body.password !== body.confirmPassword) {
    return jsonResponse({ message: "Mật khẩu không trùng khớp." }, 400);
  }

  if (body.username.length < 3) {
    return jsonResponse({ message: "Tên tài khoản phải ít nhất 3 ký tự." }, 400);
  }

  if (body.password.length < 6) {
    return jsonResponse({ message: "Mật khẩu phải ít nhất 6 ký tự." }, 400);
  }

  const username = body.username.trim();
  const hash = await sha256(body.password);

  try {
    await context.env.DB.prepare(
      "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)"
    )
      .bind(username, hash, "user")
      .run();

    return jsonResponse({
      message: `Tạo tài khoản ${username} thành công! Vui lòng đăng nhập.`,
    }, 201);
  } catch (error) {
    if (error.message?.includes("UNIQUE")) {
      return jsonResponse({ message: "Tên tài khoản đã tồn tại." }, 409);
    }
    console.error("Register error:", error);
    return jsonResponse({ message: "Lỗi khi tạo tài khoản. Vui lòng thử lại." }, 500);
  }
}