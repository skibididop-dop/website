# ShopTuiMu Website

Website tĩnh có form đăng ký/đăng nhập và API Cloudflare Pages Functions kết nối D1 để lưu tài khoản.

## 1) Tạo database D1

```bash
npx wrangler d1 create shoptuimu-db
```

Copy `database_id` nhận được và thay vào `wrangler.toml`.

## 2) Khởi tạo bảng users + seed admin

```bash
npx wrangler d1 execute shoptuimu-db --file=./db/schema.sql
```

Sau khi chạy schema, có sẵn 3 tài khoản admin:

- `admin01` / `nguyenmanhphong`
- `admin02` / `luutrongtin`
- `admin03` / `phamminhhieu`

## 3) Chạy local

```bash
npm install
npm run dev
```

## 4) Deploy Cloudflare Pages

```bash
npx wrangler login
npm run deploy
```

## API hiện có

- `POST /api/register`: tạo tài khoản mới vào D1 (`role=user`).
- `POST /api/login`: kiểm tra tài khoản từ D1 và trả `isAdmin`.
