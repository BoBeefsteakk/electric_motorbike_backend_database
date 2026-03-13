const express = require("express");
const router  = express.Router();
const mysql   = require("mysql2");

const db = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "123456",
  database: "myapp",
});

// GET /api/accessories
router.get("/", (req, res) => {
  db.query("SELECT * FROM accessory ORDER BY id ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/accessories/:id
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM accessory WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    }
  );
});

module.exports = router;