const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE account = ?",
      [account]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (account, password) VALUES (?, ?)",
      [account, hashedPassword]
    );

    res.json({ message: "Register success" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM users WHERE account = ?",
        [account]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, account: user.account },
      "mySecretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};