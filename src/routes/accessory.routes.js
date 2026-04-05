const express = require("express");
const router  = express.Router();
const db      = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accessory ORDER BY id ASC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accessory WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;