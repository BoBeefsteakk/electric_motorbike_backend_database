const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const storeRoutes = require("./routes/store.routes");
const voucherRoutes = require("./routes/voucher.routes");
const carRoutes = require("./routes/car.routes");

const app = express();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myapp",
});

db.connect((err) => {
  if (err) {
    console.log("Lỗi kết nối DB:", err);
  } else {
    console.log("Đã kết nối MySQL");
  }
});

app.use(cors());
app.use(express.json());

app.use("/images", express.static("public/images"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 
app.use("/api/stores", storeRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/cars", carRoutes);

app.post("/register", async (req, res) => {
  const { account, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (account, password) VALUES (?, ?)",
      [account, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Lỗi tạo user" });
        }

        res.json({ message: "Đăng ký thành công" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.post("/login", (req, res) => {
  const { account, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE account = ?",
    [account],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Lỗi server" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
      }

      res.json({ message: "Login thành công" });
    }
  );
});

// ── ĐĂNG KÝ TƯ VẤN ──
app.post("/api/consult", (req, res) => {
  const { fullName, phone, email, carType } = req.body;
 
  if (!fullName || !phone || !email) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
 
  db.query(
    "INSERT INTO consults (full_name, phone, email, car_type) VALUES (?, ?, ?, ?)",
    [fullName, phone, email, carType || ""],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Lỗi lưu dữ liệu" });
      }
      res.json({ message: "Đăng ký tư vấn thành công" });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});