const express = require("express");
const router = express.Router();
const db = require("../db");

// POST analyze
router.post("/analyze", (req, res) => {
  const { userId, jobRole, selectedSkills } = req.body;

  if (!userId || !jobRole || !Array.isArray(selectedSkills)) {
    return res.status(400).json({ message: "Missing data" });
  }

  db.query(
    "SELECT skill FROM jobrole_skills WHERE job_role=?",
    [jobRole],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error" });

      const requiredSkills = rows.map((r) => r.skill);

      const matchedSkills = selectedSkills.filter((s) =>
        requiredSkills.includes(s)
      );

      const missingSkills = requiredSkills.filter(
        (s) => !selectedSkills.includes(s)
      );

      const readinessScore = Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      );

      // delete old skills
      db.query(
        "DELETE FROM student_skills WHERE user_id=? AND job_role=?",
        [userId, jobRole],
        () => {
          const values = selectedSkills.map((skill) => [userId, jobRole, skill]);

          if (values.length === 0) {
            return res.json({ jobRole, matchedSkills, missingSkills, readinessScore });
          }

          db.query(
            "INSERT INTO student_skills (user_id, job_role, skill) VALUES ?",
            [values],
            () => {
              res.json({ jobRole, matchedSkills, missingSkills, readinessScore });
            }
          );
        }
      );
    }
  );
});

// ✅ GET analysis data again after login (from DB)
router.get("/analysis/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT job_role FROM student_profiles WHERE user_id=?",
    [userId],
    (err, profileRows) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (profileRows.length === 0) return res.json(null);

      const jobRole = profileRows[0].job_role;

      db.query(
        "SELECT skill FROM jobrole_skills WHERE job_role=?",
        [jobRole],
        (err, requiredRows) => {
          const requiredSkills = requiredRows.map((r) => r.skill);

          db.query(
            "SELECT skill FROM student_skills WHERE user_id=? AND job_role=?",
            [userId, jobRole],
            (err, selectedRows) => {
              const selectedSkills = selectedRows.map((r) => r.skill);

              const matchedSkills = selectedSkills.filter((s) =>
                requiredSkills.includes(s)
              );
              const missingSkills = requiredSkills.filter(
                (s) => !selectedSkills.includes(s)
              );

              const readinessScore = requiredSkills.length
                ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
                : 0;

              res.json({ jobRole, matchedSkills, missingSkills, readinessScore });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
