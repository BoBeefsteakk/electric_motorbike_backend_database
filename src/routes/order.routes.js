const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Tạo đơn hàng
router.post("/create", async (req, res) => {
  const { userId, cartItems, subTotal, discount = 0, finalPrice } = req.body;

  if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin đơn hàng",
    });
  }

  const orderId = `VF${Date.now()}`;
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      `
        INSERT INTO orders (
          order_id,
          user_id,
          sub_total,
          discount,
          final_price,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [orderId, userId, subTotal, discount, finalPrice, "Đang xử lý"],
    );

    for (const item of cartItems) {
      await conn.query(
        `
          INSERT INTO order_items (
            order_id,
            product_id,
            name,
            price,
            image,
            quantity
          )
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.productId || item.id,
          item.name,
          item.price,
          item.image || "",
          item.quantity || 1,
        ],
      );
    }

    for (const item of cartItems) {
      await conn.query(
        `DELETE FROM cart WHERE user_id = ? AND product_id = ?`,
        [userId, item.productId || item.id],
      );
    }

    await conn.commit();

    return res.json({
      success: true,
      message: "Tạo đơn hàng thành công",
      orderId,
    });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json({
      success: false,
      message: err.message || "Lỗi server khi tạo đơn hàng",
    });
  } finally {
    conn.release();
  }
});

// Hủy đơn hàng
router.post("/cancel", async (req, res) => {
  const { orderId, userId } = req.body;

  if (!orderId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Thiếu orderId hoặc userId",
    });
  }

  try {
    const [result] = await db.query(
      `
        UPDATE orders
        SET status = 'Đã hủy'
        WHERE order_id = ? AND user_id = ? AND status <> 'Đã hủy'
      `,
      [orderId, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy đơn hàng phù hợp hoặc đơn đã bị hủy",
      });
    }

    return res.json({
      success: true,
      message: "Hủy đơn hàng thành công",
      data: {
        orderId,
        status: "Đã hủy",
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Lỗi server khi hủy đơn hàng",
    });
  }
});

// Lấy danh sách đơn hàng theo user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [orders] = await db.query(
      `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      [userId],
    );

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const [items] = await db.query(
          `
            SELECT *
            FROM order_items
            WHERE order_id = ?
          `,
          [order.order_id],
        );

        return {
          id: order.id,
          orderId: order.order_id,
          userId: order.user_id,
          subTotal: order.sub_total,
          discount: order.discount,
          finalPrice: order.final_price,
          status: order.status,
          createdAt: order.created_at,
          items,
        };
      }),
    );

    return res.json({
      success: true,
      data: formattedOrders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Lỗi server khi lấy danh sách đơn hàng",
    });
  }
});

// Lấy chi tiết 1 đơn hàng
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const [[order]] = await db.query(
      `
        SELECT *
        FROM orders
        WHERE order_id = ?
      `,
      [orderId],
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const [items] = await db.query(
      `
        SELECT *
        FROM order_items
        WHERE order_id = ?
      `,
      [orderId],
    );

    return res.json({
      success: true,
      data: {
        id: order.id,
        orderId: order.order_id,
        userId: order.user_id,
        subTotal: order.sub_total,
        discount: order.discount,
        finalPrice: order.final_price,
        status: order.status,
        createdAt: order.created_at,
        items,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Lỗi server khi lấy chi tiết đơn hàng",
    });
  }
});

module.exports = router;
