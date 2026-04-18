const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

// ─────────────────────────────────────────────
// PUBLIC — không cần đăng nhập
// ─────────────────────────────────────────────
router.get("/", productController.getAllProducts);
router.get("/:type/:id", productController.getProductById);

// ─────────────────────────────────────────────
// ADMIN — cần token JWT
// ─────────────────────────────────────────────

// Lấy danh sách (có filter keyword, type)
router.get("/admin/products", authMiddleware, productController.adminGetAll);

// Lấy 1 sản phẩm
router.get("/admin/products/:type/:id", authMiddleware, productController.adminGetOne);

// Tạo mới
router.post("/admin/products", authMiddleware, productController.adminCreate);

// Cập nhật
router.put("/admin/products/:type/:id", authMiddleware, productController.adminUpdate);

// Xóa 1
router.delete("/admin/products/:type/:id", authMiddleware, productController.adminDelete);

// Xóa nhiều — đặt TRƯỚC /:type/:id để không bị route conflict
router.post("/admin/products/bulk-delete", authMiddleware, productController.adminBulkDelete);

// Duplicate 1
router.post("/admin/products/duplicate/:type/:id", authMiddleware, productController.adminDuplicate);

// Duplicate nhiều
router.post("/admin/products/bulk-duplicate", authMiddleware, productController.adminBulkDuplicate);

module.exports = router;