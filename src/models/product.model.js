// models/product.model.js
const mysql = require("mysql2/promise");

// Pool kết nối MySQL — dùng chung toàn app
const db = mysql.createPool({
  host:     "localhost",
  user:     "root",
  password: "123456",
  database: "myapp",
});

const Product = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM motorbike");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM motorbike WHERE id = ?", [id]);
    return rows[0] || null;
  },
};

// Export cả Product lẫn db để controller dùng chung pool
// — tránh tạo nhiều pool gây lãng phí connection
module.exports = Product;
module.exports.db = db;