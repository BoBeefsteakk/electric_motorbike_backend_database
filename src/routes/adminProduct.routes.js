const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

// ADMIN PRODUCTS
router.get("/", productController.adminGetAll);
router.get("/:type/:id", productController.adminGetOne);

router.post("/", productController.adminCreate);

router.put("/:type/:id", productController.adminUpdate);

router.delete("/:type/:id", productController.adminDelete);
router.post("/bulk-delete", productController.adminBulkDelete);
router.post("/duplicate/:type/:id", productController.adminDuplicate);
router.post("/bulk-duplicate", productController.adminBulkDuplicate);

module.exports = router;