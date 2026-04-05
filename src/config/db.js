// src/config/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || "localhost",
  user:               process.env.DB_USER     || "root",
  password:           process.env.DB_PASSWORD || "123456",
  database:           process.env.DB_NAME     || "myapp",
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

pool.getConnection()
  .then((conn) => { console.log("✅ Đã kết nối MySQL (pool)"); conn.release(); })
  .catch((err) => { console.error("❌ Lỗi kết nối DB:", err.message); process.exit(1); });

module.exports = pool;