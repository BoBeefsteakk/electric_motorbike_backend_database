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

exports.forgotPassword = async (req, res) => {
  try {
    const { account } = req.body;

    if (!account) {
      return res.status(400).json({ message: "Missing account" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE account = ?",
      [account]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Account not found" });
    }

    return res.json({
      message: "Reset request sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { account, newPassword } = req.body;

    if (!account || !newPassword) {
      return res.status(400).json({ message: "Missing account or new password" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE account = ?",
      [account]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Account not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = ? WHERE account = ?",
      [hashedPassword, account]
    );

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};