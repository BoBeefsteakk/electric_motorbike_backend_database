const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const IMAGE_FOLDER = path.join(__dirname, "../public/images/store");

async function seedStores() {

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "myapp"
  });

  const files = fs.readdirSync(IMAGE_FOLDER);

  let index = 1;

  for (const file of files) {

    if (!file.endsWith(".jpg") && !file.endsWith(".png")) continue;

    const name = file
      .replace(".jpg", "")
      .replace(".png", "")
      .replace(/_/g, " ");

    const image = `/images/store/${file}`;

    const address = "Địa chỉ đang cập nhật";

    const route = `store_${index}_detail`;

    await db.query(
      "INSERT INTO stores (name, rating, address, image, route) VALUES (?, ?, ?, ?, ?)",
      [name, 4.8, address, image, route]
    );

    console.log("Inserted:", name);

    index++;
  }

  console.log("✅ Import stores hoàn tất");

  process.exit();
}

seedStores();