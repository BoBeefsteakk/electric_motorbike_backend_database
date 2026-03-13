const express    = require("express");
const bcrypt     = require("bcrypt");
const cors       = require("cors");
const mysql      = require("mysql2");
require("dotenv").config();

/* ── Routes ── */
const productRoutes   = require("./routes/product.routes");
const authRoutes      = require("./routes/auth.routes");
const storeRoutes     = require("./routes/store.routes");
const voucherRoutes   = require("./routes/voucher.routes");
const carRoutes       = require("./routes/car.routes");
const accessoryRoutes = require("./routes/accessory.routes");

const app = express();

/* ── DB — dùng Pool thay createConnection ──
   createConnection sẽ crash server nếu connection bị drop (timeout, mất mạng).
   Pool tự reconnect và quản lý nhiều connection đồng thời. ── */
const db = mysql.createPool({
  host:               process.env.DB_HOST     || "localhost",
  user:               process.env.DB_USER     || "root",
  password:           process.env.DB_PASSWORD || "123456",
  database:           process.env.DB_NAME     || "myapp",
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

/* Kiểm tra kết nối lúc khởi động */
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Lỗi kết nối DB:", err.message);
    process.exit(1);
  }
  console.log("✅ Đã kết nối MySQL");
  conn.release();
});

/* ── Middleware ── */
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

/* ── API Routes ── */
app.use("/api/auth",        authRoutes);
app.use("/api/products",    productRoutes);
app.use("/api/stores",      storeRoutes);
app.use("/api/vouchers",    voucherRoutes);
app.use("/api/cars",        carRoutes);        // fix: /cars → /api/cars cho nhất quán
app.use("/api/accessories", accessoryRoutes);

/* ── Auth (legacy — giữ lại nếu app đang dùng, nên chuyển vào authRoutes sau) ── */
app.post("/register", async (req, res) => {
  const { account, password } = req.body;
  if (!account?.trim() || !password?.trim())
    return res.status(400).json({ message: "Thiếu thông tin" });
  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (account, password) VALUES (?, ?)",
      [account, hashed],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ message: "Tài khoản đã tồn tại" });
          console.error(err);
          return res.status(500).json({ message: "Lỗi tạo user" });
        }
        res.status(201).json({ message: "Đăng ký thành công" });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.post("/login", (req, res) => {
  const { account, password } = req.body;
  if (!account?.trim() || !password?.trim())
    return res.status(400).json({ message: "Thiếu thông tin" });

  db.query("SELECT * FROM users WHERE account = ?", [account], async (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ message: "Lỗi server" }); }
    if (results.length === 0)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    res.json({ message: "Login thành công" });
  });
});

/* ── Đăng ký tư vấn ── */
app.post("/api/consult", (req, res) => {
  const { fullName, phone, email, carType } = req.body;
  if (!fullName?.trim() || !phone?.trim() || !email?.trim())
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });

  db.query(
    "INSERT INTO consults (full_name, phone, email, car_type) VALUES (?, ?, ?, ?)",
    [fullName.trim(), phone.trim(), email.trim(), carType || ""],
    (err) => {
      if (err) { console.error(err); return res.status(500).json({ message: "Lỗi lưu dữ liệu" }); }
      res.status(201).json({ message: "Đăng ký tư vấn thành công" });
    }
  );
});

/* ── 404 handler ── */
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} không tồn tại` });
});

/* ── Global error handler ── */
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ message: "Lỗi server không xác định" });
});

/* ── Start ── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});