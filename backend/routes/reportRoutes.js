const express = require("express");
const PDFDocument = require("pdfkit");
const router = express.Router();

router.post("/download-report", (req, res) => {

  // ✅ STEP 1 LOG (PLACE HERE)
  console.log("PDF route hit");

  const {
    name,
    jobRole,
    matchedSkills,
    missingSkills,
    readinessScore,
  } = req.body;

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SkillSync_Report.pdf"
  );

  doc.pipe(res);

  doc.fontSize(22).text("SkillSync Skill Analysis Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Job Role: ${jobRole}`);
  doc.text(`Readiness Score: ${readinessScore}%`);
  doc.moveDown();

  doc.fontSize(16).text("Matched Skills", { underline: true });
  matchedSkills.forEach(skill => doc.text(`• ${skill}`));

  doc.moveDown();
  doc.fontSize(16).text("Missing Skills", { underline: true });
  missingSkills.forEach(skill => doc.text(`• ${skill}`));

  // ✅ STEP 1 LOG (PLACE HERE)
  console.log("PDF generated, ending stream");

  doc.end(); // 🔥 MUST BE LAST
});

module.exports = router;
