const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/products/featured
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        price,
        image
      FROM motorbike
      WHERE is_featured = 1
      ORDER BY id ASC
      `
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;