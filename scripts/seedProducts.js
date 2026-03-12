const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

// kết nối database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myapp"
});

// folder chứa ảnh xe
const folderPath = path.join(__dirname, "../public/images/motorbike");

// hàm tự đoán giá theo tên xe
function getPrice(name) {
  name = name.toLowerCase();

  if (name.includes("theon")) return 69000000;
  if (name.includes("klara")) return 39000000;
  if (name.includes("viper")) return 42000000;
  if (name.includes("feliz")) return 30000000;
  if (name.includes("vento")) return 27000000;
  if (name.includes("evo")) return 22000000;

  return 25000000;
}

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log("Lỗi đọc folder:", err);
    return;
  }

  console.log("Reset motorbike table...");

  db.query("DELETE FROM motorbike", (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Importing motorbikes...");

    files.forEach((file) => {

      const name = file.replace(/\.[^/.]+$/, "");
      const price = getPrice(name);
      const image = `motorbike/${file}`;

      const sql = `
        INSERT INTO motorbike (name, price, image, category)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [name, price, image, "electric"], (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Inserted:", name);
        }
      });

    });
  });
});