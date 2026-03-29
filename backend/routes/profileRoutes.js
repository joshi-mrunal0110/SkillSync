const express = require("express");
const router = express.Router();
const db = require("../db");

// SAVE/UPDATE student info
router.post("/student-info", (req, res) => {
  const { userId, degree, graduationYear, jobRole } = req.body;

  if (!userId || !degree || !graduationYear || !jobRole)
    return res.status(400).json({ message: "All fields required" });

  const sql = `
    INSERT INTO student_profiles (user_id, degree, graduation_year, job_role)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      degree=VALUES(degree),
      graduation_year=VALUES(graduation_year),
      job_role=VALUES(job_role)
  `;

  db.query(sql, [userId, degree, graduationYear, jobRole], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json({ message: "Student info saved" });
  });
});

// GET student info by userId
router.get("/student-info/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM student_profiles WHERE user_id=?",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (rows.length === 0) return res.json(null);

      res.json(rows[0]);
    }
  );
});

module.exports = router;
