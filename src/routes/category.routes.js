const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name, type, color, route, image, sort_order
      FROM categories
      ORDER BY sort_order ASC, id ASC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;