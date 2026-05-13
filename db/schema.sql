CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO users (username, password_hash, role) VALUES
  ('admin01', 'e581e3edf5108dc48c6ac8d4276e33e71c0badb3be65c0792ea81bdcacedfa21', 'admin'),
  ('admin02', 'c92e4ace735f77c518db9052dd9f8bfd8ac380189f9698b2e604ad1f1a703062', 'admin'),
  ('admin03', 'f3e8c272ffc5e116f8553ee988e52f61883e1fe38df0e2788478476fa4d65911', 'admin');
