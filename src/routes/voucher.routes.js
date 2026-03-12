// routes/voucher.routes.js
const express = require("express");
const router  = express.Router();
const mysql   = require("mysql2/promise");

const db = mysql.createPool({
  host:     "localhost",
  user:     "root",
  password: "123456",
  database: "myapp",
});

// GET /api/vouchers
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vouchers ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;