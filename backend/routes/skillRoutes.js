const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/skills/:role", (req, res) => {
  const role = req.params.role;

  db.query(
    "SELECT skill FROM jobrole_skills WHERE job_role=?",
    [role],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error" });

      res.json({
        jobRole: role,
        skills: rows.map((r) => r.skill),
      });
    }
  );
});

module.exports = router;
