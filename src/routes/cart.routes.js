// src/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/cart/:userId — lấy giỏ hàng
router.get("/:userId", async (req, res) => {
  try {
    const [items] = await db.query(
      `SELECT
         product_id as productId,
         name,
         price,
         image,
         quantity,
         color_id as colorId,
         color_name as colorName,
         color_value as colorValue
       FROM cart
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.params.userId]
    );

    res.json({ success: true, data: { items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/cart/add — thêm sản phẩm
router.post("/add", async (req, res) => {
  let {
  userId,
  productId,
  name,
  price,
  image,
  quantity = 1,
  colorId = null,
  colorName = null,
  colorValue = null,
} = req.body;

if (colorId == null) colorId = 0;
if (!colorName) colorName = "default";

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin" });
  }

  try {
    await db.query(
      `INSERT INTO cart
        (user_id, product_id, name, price, image, quantity, color_id, color_name, color_value)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         quantity = quantity + VALUES(quantity),
         updated_at = NOW()`,
      [userId, productId, name, price, image, quantity, colorId, colorName, colorValue]
    );

    res.json({ success: true, message: "Đã thêm vào giỏ hàng" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/cart/update-quantity — cập nhật số lượng
router.post("/update-quantity", async (req, res) => {
  const { userId, productId, quantity, colorId = null } = req.body;

  try {
    if (quantity <= 0) {
      await db.query(
        `DELETE FROM cart
         WHERE user_id = ?
           AND product_id = ?
           AND ((color_id IS NULL AND ? IS NULL) OR color_id = ?)`,
        [userId, productId, colorId, colorId]
      );
    } else {
      await db.query(
        `UPDATE cart
         SET quantity = ?, updated_at = NOW()
         WHERE user_id = ?
           AND product_id = ?
           AND ((color_id IS NULL AND ? IS NULL) OR color_id = ?)`,
        [quantity, userId, productId, colorId, colorId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/cart/remove-item — xoá sản phẩm
router.post("/remove-item", async (req, res) => {
  const { userId, productId, colorId = null } = req.body;

  try {
    await db.query(
      `DELETE FROM cart
       WHERE user_id = ?
         AND product_id = ?
         AND ((color_id IS NULL AND ? IS NULL) OR color_id = ?)`,
      [userId, productId, colorId, colorId]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;