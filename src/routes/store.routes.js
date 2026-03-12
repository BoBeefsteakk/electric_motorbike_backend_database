const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myapp",
});

// GET tất cả stores
router.get("/", (req, res) => {
  db.query("SELECT * FROM stores", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
});

// GET 1 store theo id  ← thêm mới
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM stores WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (results.length === 0)
        return res.status(404).json({ message: "Không tìm thấy cửa hàng" });
      res.json(results[0]);
    }
  );
});

module.exports = router;