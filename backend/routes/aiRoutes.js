const express = require("express");

const router = express.Router();
const GEMINI_KEY = process.env.GEMINI_API_KEY;

/* ===============================
   TEST ROUTE (FINAL & WORKING)
   =============================== */
router.get("/test-gemini", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: "Respond with exactly the word OK." }
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "NO_TEXT";

    res.send(text);
  } catch (err) {
    console.error("TEST ERROR:", err);
    res.status(500).send("Gemini test failed");
  }
});

/* ===============================
   AI ROADMAP ROUTE
   =============================== */
router.post("/roadmap", async (req, res) => {
  const { jobRole, missingSkills, duration } = req.body;

  if (!jobRole || !Array.isArray(missingSkills)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const prompt = `
Return ONLY valid JSON.

Create a ${duration}-month learning roadmap for a ${jobRole}.
Missing skills: ${missingSkills.join(", ")}

Format:
{
  "roadmap": [
    {
      "week": 1,
      "skill": "Skill",
      "resources": ["Resource 1", "Resource 2"],
      "project": "Mini project"
    }
  ]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const clean = rawText.replace(/```json|```/g, "").trim();
    const json = JSON.parse(clean.match(/\{[\s\S]*\}/)[0]);

    res.json({
      roadmap: json.roadmap,
      source: "gemini",
    });
  } catch (err) {
    console.error("Gemini failed, using fallback");

    /* ===== FALLBACK ===== */
    let week = 1;
    const roadmap = [];

    missingSkills.forEach((skill) => {
      const phases =
        duration === 1
          ? ["Basics"]
          : duration === 3
          ? ["Basics", "Practice", "Project"]
          : ["Basics", "Practice", "Advanced", "Project"];

      phases.forEach((phase) => {
        roadmap.push({
          week: week++,
          skill,
          resources: [
            `${skill} ${phase} tutorial`,
            `${skill} documentation`,
          ],
          project:
            phase === "Project"
              ? `Build a project using ${skill}`
              : `Practice ${skill}`,
        });
      });
    });

    res.json({
      roadmap,
      source: "fallback",
    });
  }
});

module.exports = router;