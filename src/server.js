const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

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

app.use("/api/auth", authRoutes);

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Lỗi tạo user" });
      }

      res.json({ message: "Đăng ký thành công" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Lỗi server" });

      if (results.length === 0) {
        return res.status(401).json({ message: "Sai email hoặc password" });
      }

      res.json({ message: "Login thành công" });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});