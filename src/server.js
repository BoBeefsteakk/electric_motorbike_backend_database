const express = require("express");
const bcrypt  = require("bcrypt");
const cors    = require("cors");
require("dotenv").config();

const db = require("./config/db");

const productRoutes   = require("./routes/product.routes");
const authRoutes      = require("./routes/auth.routes");
const storeRoutes     = require("./routes/store.routes");
const voucherRoutes   = require("./routes/voucher.routes");
const carRoutes       = require("./routes/car.routes");
const accessoryRoutes = require("./routes/accessory.routes");
const cartRoutes       = require("./routes/cart.routes");
const orderRoutes      = require("./routes/order.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

app.use("/api/auth",        authRoutes);
app.use("/api/products",    productRoutes);
app.use("/api/stores",      storeRoutes);
app.use("/api/vouchers",    voucherRoutes);
app.use("/api/cars",        carRoutes);
app.use("/api/accessories", accessoryRoutes);
app.use("/api/cart",        cartRoutes);
app.use("/api/orders",      orderRoutes);

app.post("/register", async (req, res) => {
  const { account, password } = req.body;
  if (!account?.trim() || !password?.trim())
    return res.status(400).json({ message: "Thiếu thông tin" });
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (account, password) VALUES (?, ?)", [account, hashed]);
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "Tài khoản đã tồn tại" });
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.post("/login", async (req, res) => {
  const { account, password } = req.body;
  if (!account?.trim() || !password?.trim())
    return res.status(400).json({ message: "Thiếu thông tin" });
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE account = ?", [account]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    res.json({ message: "Login thành công" });
  } catch (err) { res.status(500).json({ message: "Lỗi server" }); }
});

app.post("/api/consult", async (req, res) => {
  const { fullName, phone, email, carType } = req.body;
  if (!fullName?.trim() || !phone?.trim() || !email?.trim())
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  try {
    await db.query(
      "INSERT INTO consults (full_name, phone, email, car_type) VALUES (?, ?, ?, ?)",
      [fullName.trim(), phone.trim(), email.trim(), carType || ""]
    );
    res.status(201).json({ message: "Đăng ký tư vấn thành công" });
  } catch (err) { res.status(500).json({ message: "Lỗi lưu dữ liệu" }); }
});

app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.path} không tồn tại` }));
app.use((err, req, res, next) => res.status(500).json({ message: "Lỗi server không xác định" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running at http://localhost:${PORT}`));