// controllers/product.controller.js
// DB pool lấy từ product.model.js (đã có sẵn, không tạo thêm)
const db = require("../models/product.model").db;

// ─────────────────────────────────────────────
// Helper: map type param → tên bảng MySQL
// ─────────────────────────────────────────────
const TABLE_MAP = {
  motorbike: "motorbike",
  car:       "cars",
  accessory: "accessory",
  store:     "stores",
};

function getTable(type) {
  return TABLE_MAP[(type || "").toLowerCase()] || null;
}

// ─────────────────────────────────────────────
// Helper: các cột được phép ghi theo từng bảng
// (bảo vệ khỏi SQL injection khi build câu lệnh động)
// ─────────────────────────────────────────────
const WRITABLE_COLS = {
  motorbike: ["name", "price", "image", "category", "is_featured"],
  cars:      ["name", "price", "image", "category"],
  accessory: ["name", "price", "image", "category", "is_featured"],
  stores:    ["name", "rating", "address", "image", "route"],
};

// ─────────────────────────────────────────────
// PUBLIC: GET /api/products
// Trả xe máy — giữ nguyên tương thích với code cũ
// ─────────────────────────────────────────────
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM motorbike");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// PUBLIC: GET /api/products/:type/:id
// ─────────────────────────────────────────────
exports.getProductById = async (req, res) => {
  const table = getTable(req.params.type);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  try {
    const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: GET /admin/products?keyword=&type=
// Gộp tất cả bảng, trả về danh sách thống nhất
// ─────────────────────────────────────────────
exports.adminGetAll = async (req, res) => {
  try {
    const keyword = (req.query.keyword || "").trim().toLowerCase();
    const type    = (req.query.type    || "").trim().toLowerCase();

    const filterFn = (p) => {
      const matchType    = !type    || p.productType?.toLowerCase().includes(type);
      const matchKeyword = !keyword
        || p.productName?.toLowerCase().includes(keyword)
        || p.description?.toLowerCase().includes(keyword)
        || String(p.productID).includes(keyword);
      return matchType && matchKeyword;
    };

    let result = [];

    // motorbike
    const [bikes] = await db.query("SELECT * FROM motorbike");
    result.push(...bikes.map(r => ({
      productID:     r.id,
      productName:   r.name,
      price:         r.price,
      pathImage:     r.image,
      productType:   "Xe máy",
      categoryGroup: r.category,
      description:   r.category,
      quantity:      1,
      unit:          "chiếc",
    })).filter(filterFn));

    // cars
    const [cars] = await db.query("SELECT * FROM cars");
    result.push(...cars.map(r => ({
      productID:     100000 + r.id,
      productName:   r.name,
      price:         r.price,
      pathImage:     r.image,
      productType:   "Ô tô",
      categoryGroup: r.category,
      description:   r.category,
      quantity:      1,
      unit:          "chiếc",
    })).filter(filterFn));

    // accessory
    const [accessories] = await db.query("SELECT * FROM accessory");
    result.push(...accessories.map(r => ({
      productID:     200000 + r.id,
      productName:   r.name,
      price:         r.price,
      pathImage:     r.image,
      productType:   "Phụ kiện",
      categoryGroup: "Phụ kiện",
      description:   r.name,
      quantity:      1,
      unit:          "món",
    })).filter(filterFn));

    // stores
    const [stores] = await db.query("SELECT * FROM stores");
    result.push(...stores.map(r => ({
      productID:     300000 + r.id,
      productName:   r.name,
      price:         0,
      pathImage:     r.image,
      productType:   "Showroom",
      categoryGroup: "Showroom",
      description:   r.address,
      quantity:      1,
      unit:          "chi nhánh",
    })).filter(filterFn));

    result.sort((a, b) => b.productID - a.productID);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: GET /admin/products/:type/:id
// ─────────────────────────────────────────────
exports.adminGetOne = async (req, res) => {
  const table = getTable(req.params.type);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  try {
    const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: POST /admin/products  — Tạo mới
// Body: { productType: "motorbike"|"car"|"accessory"|"store", name, price, image, ... }
// ─────────────────────────────────────────────
exports.adminCreate = async (req, res) => {
  const { productType, ...data } = req.body;
  const table = getTable(productType);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  const allowed = WRITABLE_COLS[table];
  const cols    = allowed.filter(c => data[c] !== undefined && data[c] !== null);
  if (!cols.length) return res.status(400).json({ message: "Không có dữ liệu hợp lệ để lưu." });

  const values = cols.map(c => data[c]);
  const sql    = `INSERT INTO \`${table}\` (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: "Tạo sản phẩm thành công.", newId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: PUT /admin/products/:type/:id  — Cập nhật
// ─────────────────────────────────────────────
exports.adminUpdate = async (req, res) => {
  const table = getTable(req.params.type);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  const allowed = WRITABLE_COLS[table];
  const cols    = allowed.filter(c => req.body[c] !== undefined && req.body[c] !== null);
  if (!cols.length) return res.status(400).json({ message: "Không có trường nào để cập nhật." });

  const setStr = cols.map(c => `\`${c}\` = ?`).join(", ");
  const values = [...cols.map(c => req.body[c]), req.params.id];
  const sql    = `UPDATE \`${table}\` SET ${setStr} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    res.json({ message: "Cập nhật thành công." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: DELETE /admin/products/:type/:id  — Xóa 1
// ─────────────────────────────────────────────
exports.adminDelete = async (req, res) => {
  const table = getTable(req.params.type);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  try {
    const [result] = await db.query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    res.json({ message: "Xóa thành công." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: POST /admin/products/bulk-delete
// Body: [{ type: "motorbike", id: 3 }, ...]
// ─────────────────────────────────────────────
exports.adminBulkDelete = async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items) || !items.length)
    return res.status(400).json({ message: "Danh sách rỗng." });

  try {
    for (const item of items) {
      const table = getTable(item.type);
      if (table && item.id) {
        await db.query(`DELETE FROM \`${table}\` WHERE id = ?`, [item.id]);
      }
    }
    res.json({ message: `Đã xóa ${items.length} sản phẩm.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: POST /admin/products/duplicate/:type/:id
// Clone bản ghi → tên mới = "Bản sao_<tên gốc>"
// ─────────────────────────────────────────────
exports.adminDuplicate = async (req, res) => {
  const table = getTable(req.params.type);
  if (!table) return res.status(400).json({ message: "Loại sản phẩm không hợp lệ." });

  try {
    // 1. Lấy bản gốc
    const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Không tìm thấy sản phẩm." });

    const original = rows[0];
    const allowed  = WRITABLE_COLS[table];
    const cols     = allowed.filter(c => original[c] !== undefined && original[c] !== null);

    // 2. Build values — prefix "Bản sao_" vào cột name
    const values = cols.map(c => c === "name" ? "Bản sao_" + original.name : original[c]);

    const sql = `INSERT INTO \`${table}\` (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;

    // 3. Insert — DB tự sinh ID mới, bản gốc không thay đổi
    const [result] = await db.query(sql, values);

    res.json({
      message: `Đã tạo bản sao của "${original.name}".`,
      newId:   result.insertId,
      newName: "Bản sao_" + original.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN: POST /admin/products/bulk-duplicate
// Body: [{ type: "motorbike", id: 3 }, ...]
// ─────────────────────────────────────────────
exports.adminBulkDuplicate = async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items) || !items.length)
    return res.status(400).json({ message: "Danh sách rỗng." });

  try {
    const created = [];

    for (const item of items) {
      const table = getTable(item.type);
      if (!table || !item.id) continue;

      const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [item.id]);
      if (!rows.length) continue;

      const original = rows[0];
      const allowed  = WRITABLE_COLS[table];
      const cols     = allowed.filter(c => original[c] !== undefined && original[c] !== null);
      const values   = cols.map(c => c === "name" ? "Bản sao_" + original.name : original[c]);
      const sql      = `INSERT INTO \`${table}\` (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;

      const [result] = await db.query(sql, values);
      created.push({ newId: result.insertId, newName: "Bản sao_" + original.name });
    }

    res.json({ message: `Đã sao chép ${created.length} sản phẩm.`, created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};