🚀 SkillSync
AI-Powered Career Readiness & Skill Gap Analysis Platform
📌 Overview
SkillSync is a full-stack web application that helps students evaluate their job readiness, identify skill gaps, and follow a personalized AI-generated roadmap to improve their skills.

It transforms unstructured learning into measurable career growth.

🎯 Features
🔐 User Authentication (Register/Login)

👤 Student Profile Setup (Job Role Selection)

📊 Skill Gap Analysis (Matched vs Missing Skills)

📈 Real-Time Readiness Score

🤖 AI-Powered Roadmap Generation

✅ Dynamic Progress Tracking

📄 Downloadable PDF Report

📉 Visual Charts (Skill Gap Pie Chart)

🧠 How It Works
User registers and logs in

Selects job role and current skills

System compares with required skills

Generates:

Matched Skills

Missing Skills

Readiness Score

AI generates a structured roadmap

User completes skills → progress updates dynamically

🏗️ Tech Stack
Frontend
React.js

React Router

Chart.js

CSS

Backend
Node.js

Express.js

REST APIs

Database
MySQL (XAMPP)

AI Integration
Gemini API / OpenAI (for roadmap generation)

🗂️ Project Structure
skillsync/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── routes/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── assets/
│
├── public/
└── package.json
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/skillsync.git
cd skillsync
2️⃣ Setup Backend
cd backend
npm install
Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skillsync
Run backend:

node server.js
3️⃣ Setup Frontend
cd ..
npm install
npm run dev
4️⃣ Setup Database
Open phpMyAdmin

Create database: skillsync

Import SQL file (if available) OR create tables manually

🗃️ Database Tables
users

student_info

student_skills

jobrole_skills

📊 Architecture
SkillSync follows a 3-Tier Architecture:

Frontend (React)
       ↓
Backend (Node.js + Express)
       ↓
Database (MySQL)
🚀 Future Enhancements
Resume Analyzer

AI Mock Interview System

Company-Specific Skill Benchmarking

JWT Authentication

Admin Dashboard

Cloud Deployment

🏆 Key Highlights
AI-driven personalized learning

Real-time progress tracking

Cross-device scalability (when using backend storage)

Clean and interactive UI

📌 Conclusion
SkillSync bridges the gap between learning and employability by providing:

✔ Clear skill analysis
✔ Structured roadmap
✔ Measurable readiness

“SkillSync doesn’t just measure skills — it builds career readiness.”

👨‍💻 Authors
Mrunal Joshi

Shivangi Sinha

📄 License
This project is for academic and demonstration purposes.
