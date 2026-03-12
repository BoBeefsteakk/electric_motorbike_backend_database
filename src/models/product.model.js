// models/product.model.js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myapp",
});

const Product = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM motorbike");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM motorbike WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = Product;