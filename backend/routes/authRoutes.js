const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../db");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  db.query("SELECT user_id FROM users WHERE email=?", [email], async (err, rows) => {
    if (rows.length > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.status(201).json({
          message: "Registered successfully",
          user: { user_id: result.insertId, name, email },
        });
      }
    );
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, rows) => {
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login success",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;
