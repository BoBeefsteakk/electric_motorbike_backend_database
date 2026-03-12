const db = require("../config/db");

const getAllCars = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cars");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCarsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const [rows] = await db.query(
      "SELECT * FROM cars WHERE category = ?",
      [category]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllCars,
  getCarsByCategory
};