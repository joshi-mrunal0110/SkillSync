const dotenv = require("dotenv");
dotenv.config();
console.log("Gemini key length:", process.env.GEMINI_API_KEY?.length);
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const reportRoutes = require("./routes/reportRoutes");
const aiRoutes = require("./routes/aiRoutes");
//const roadmapPdf = require("./routes/roadmapPdf");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", skillRoutes);
app.use("/api", analysisRoutes);
app.use("/api", reportRoutes);
app.use("/api/ai", aiRoutes);
//app.use("/api", roadmapPdf);

app.listen(5000, () => console.log("Server running on port 5000"));