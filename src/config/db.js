const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",   // sửa theo MySQL của pri
  database: "myapp"   // đúng tên database pri đã tạo
});

module.exports = db;