🚀 SkillSync<br>
AI-Powered Career Readiness & Skill Gap Analysis Platform<br>

📌 Overview<br>
SkillSync is a full-stack web application that helps students evaluate their job readiness, identify skill gaps, and follow a personalized AI-generated roadmap to improve their skills.<br>

It transforms unstructured learning into measurable career growth.<br>

🎯 Features<br>
🔐 User Authentication (Register/Login)<br>
👤 Student Profile Setup (Job Role Selection)<br>
📊 Skill Gap Analysis (Matched vs Missing Skills)<br>
📈 Real-Time Readiness Score<br>
🤖 AI-Powered Roadmap Generation<br>
✅ Dynamic Progress Tracking<br>
📄 Downloadable PDF Report<br>
📉 Visual Charts (Skill Gap Pie Chart)<br>

🧠 How It Works<br>
User registers and logs in<br>
Selects job role and current skills<br>
System compares with required skills<br>
Generates:<br>
Matched Skills<br>
Missing Skills<br>
Readiness Score<br>
AI generates a structured roadmap<br>
User completes skills → progress updates dynamically<br>

🏗️ Tech Stack<br>
Frontend<br>
React.js<br>
React Router<br>
Chart.js<br>
CSS<br>

Backend<br>
Node.js<br>
Express.js<br>
REST APIs<br>

Database<br>
MySQL (XAMPP)<br>


AI Integration<br>
Gemini API (for roadmap generation)<br>

🗂️ Project Structure<br>
skillsync/<br>
│<br>
├── backend/<br>
│   ├── db.js<br>
│   ├── server.js<br>
│   ├── routes/<br>
│<br>
├── src/<br>
│   ├── pages/<br>
│   ├── components/<br>
│   ├── assets/<br>
│<br>
├── public/<br>
└── package.json<br>

⚙️ Installation & Setup<br>
1️⃣ Clone the Repository<br>
git clone https://github.com/your-username/skillsync.git<br>
cd skillsync<br>
2️⃣ Setup Backend<br>
cd backend<br>
npm install<br>
Create .env file:<br>

DB_HOST=localhost<br>
DB_USER=root<br>
DB_PASSWORD=<br>
DB_NAME=skillsync<br>
Run backend:<br>

node server.js<br>
3️⃣ Setup Frontend<br>
cd ..<br>
npm install<br>
npm run dev<br>
4️⃣ Setup Database<br>
Open phpMyAdmin<br>

Create database: skillsync<br>

Import SQL file (if available) OR create tables manually<br>


🗃️ Database Tables<br>
users<br>
student_info<br>
student_skills<br>
jobrole_skills<br>

📊 Architecture<br>
SkillSync follows a 3-Tier Architecture:<br>

Frontend (React)<br>
       ↓<br>
Backend (Node.js + Express)<br>
       ↓<br>
Database (MySQL)<br>

🚀 Future Enhancements<br>
Resume Analyzer<br>
AI Mock Interview System<br>
Company-Specific Skill Benchmarking<br>
JWT Authentication<br>
Admin Dashboard<br>
Cloud Deployment<br>

🏆 Key Highlights<br>
AI-driven personalized learning<br>
Real-time progress tracking<br>
Cross-device scalability (when using backend storage)<br>
Clean and interactive UI<br>

📌 Conclusion<br>
SkillSync bridges the gap between learning and employability by providing:<br>

✔ Clear skill analysis<br>
✔ Structured roadmap<br>
✔ Measurable readiness<br>

“SkillSync doesn’t just measure skills — it builds career readiness.”<br>

Demo Link: https://drive.google.com/file/d/1kvijQ5ODDkVGHu0GnmkpOWJHcID-DyyX/view<br>

👨‍💻 Authors<br>
Mrunal Joshi<br>
Shivangi Sinha<br>

📄 License<br>
This project is for academic and demonstration purposes.<br>
