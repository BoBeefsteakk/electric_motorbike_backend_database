const db = require("../config/db");

// GET all accessories
const getAllAccessories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accessory");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET accessory by id
const getAccessoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM accessory WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE accessory
const createAccessory = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const [result] = await db.query(
      "INSERT INTO accessory (name, price, image) VALUES (?, ?, ?)",
      [name, price, image]
    );

    res.json({
      message: "Accessory created",
      id: result.insertId
    });

  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE accessory
const updateAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;

    await db.query(
      "UPDATE accessory SET name=?, price=?, image=? WHERE id=?",
      [name, price, image, id]
    );

    res.json({ message: "Accessory updated" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE accessory
const deleteAccessory = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM accessory WHERE id=?",
      [id]
    );

    res.json({ message: "Accessory deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllAccessories,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory
};