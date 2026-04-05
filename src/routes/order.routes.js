// src/routes/order.routes.js
const express = require("express");
const router  = express.Router();
const db      = require("../config/db");

// POST /api/orders/create — tạo đơn hàng từ checkout
router.post("/create", async (req, res) => {
  const { userId, cartItems, subTotal, discount = 0, finalPrice } = req.body;
  if (!userId || !cartItems?.length) 
    return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng" });

  const orderId = `VF${Date.now()}`;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Tạo đơn hàng
    await conn.query(
      "INSERT INTO orders (order_id, user_id, sub_total, discount, final_price) VALUES (?, ?, ?, ?, ?)",
      [orderId, userId, subTotal, discount, finalPrice]
    );

    // Tạo order items
    for (const item of cartItems) {
      await conn.query(
        "INSERT INTO order_items (order_id, product_id, name, price, image, quantity) VALUES (?, ?, ?, ?, ?, ?)",
        [orderId, item.productId, item.name, item.price, item.image || "", item.quantity]
      );
    }

    // Xoá các item đã mua khỏi giỏ hàng
    for (const item of cartItems) {
      await conn.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, item.productId]);
    }

    await conn.commit();
    res.json({ success: true, orderId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
});

// GET /api/orders/user/:userId — lấy danh sách đơn hàng
router.get("/user/:userId", async (req, res) => {
  try {
    const [orderRows] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [req.params.userId]
    );

    // Lấy items cho từng đơn
    const orders = await Promise.all(orderRows.map(async (order) => {
        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [order.order_id]
        );
        return {
            _id:        order.id,
            orderId:    order.order_id,
            finalPrice: order.final_price,
            status:     order.status,
            createdAt:  order.created_at,
            items,
        };
        }));

    res.json({ success: true, data: orders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET /api/orders/:orderId — chi tiết 1 đơn
router.get("/:orderId", async (req, res) => {
  try {
    const [[order]] = await db.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [req.params.orderId]
    );
    if (!order) return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });

    const [items] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [req.params.orderId]
    );
    res.json({ success: true, data: { ...order, items } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;