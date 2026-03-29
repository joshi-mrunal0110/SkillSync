import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();

  // 🔹 Fetch stored data
  const user = JSON.parse(localStorage.getItem("user"));
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const avatar =
    studentInfo?.gender?.toLowerCase() === "female"
      ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
      : "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

  const analysisResult = JSON.parse(localStorage.getItem("analysisResult"));

  // 🔐 Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ❌ Not logged in (while redirecting)
  if (!user) return null;

  /* ==============================
     CASE 1: Student Info missing
     ============================== */
  if (!studentInfo) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">SkillSync</h2>
          <ul>
            <li className="active">Dashboard</li>
            <li onClick={() => navigate("/student-info")}>Complete Profile</li>
            <li
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </li>
          </ul>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <h2>Hello {user.name} 👋</h2>
          </header>

          <div className="box" style={{ maxWidth: "600px" }}>
            <h3>Complete Your Profile</h3>
            <p>
              Please fill in your student information to personalize your
              dashboard and generate skill analysis.
            </p>
            <button
              className="roadmap-btn"
              onClick={() => navigate("/student-info")}
            >
              Complete Profile →
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ==============================
     CASE 2: Skills not selected
     ============================== */
  if (studentInfo && !analysisResult) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">SkillSync</h2>
          <ul>
            <li className="active">Dashboard</li>
            <li onClick={() => navigate("/select-skills")}>Select Skills</li>
            <li
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </li>
          </ul>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <h2>Hello {user.name} 👋</h2>
            <p>Job Role: {studentInfo.jobRole}</p>
          </header>

          <div className="box" style={{ maxWidth: "600px" }}>
            <h3>Skill Selection Pending</h3>
            <p>
              Please select your current skills to generate your skill gap
              analysis and readiness score.
            </p>
            <button
              className="roadmap-btn"
              onClick={() => navigate("/select-skills")}
            >
              Select Skills →
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ==============================
     CASE 3: FULL DASHBOARD
     ============================== */

  const { jobRole, matchedSkills, missingSkills, readinessScore } =
    analysisResult;

  const pieData = {
    labels: ["Matched Skills", "Missing Skills"],
    datasets: [
      {
        data: [matchedSkills.length, missingSkills.length],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const downloadReport = async () => {
    const res = await fetch("http://localhost:5000/api/download-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        jobRole,
        matchedSkills,
        missingSkills,
        readinessScore,
      }),
    });

    const blob = await res.blob();

    const url = window.URL.createObjectURL(
      new Blob([blob], { type: "application/pdf" }),
    );

    const a = document.createElement("a");
    a.href = url;
    a.download = "SkillSync_Report.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SkillSync</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/acquire-skills")}>Roadmap</li>
          <li onClick={downloadReport}>Download Report</li>
          <li
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Top Header */}
        <header className="topbar fancy">
          <div>
            <h2>Welcome back, {user.name} 👋</h2>
            <p>{jobRole}</p>
          </div>
          <button className="download-btn" onClick={downloadReport}>
            Download Report ⬇
          </button>
        </header>

        {/* Profile + Score */}
        <section className="profile-score">
          <div className="profile-card">
            <img
              src={avatar}
              alt="profile"
            />
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>
                <b>Role:</b> {jobRole}
              </p>
            </div>
          </div>

          <div className="score-card">
            <h4>Readiness Score</h4>
            <div className="score-circle">{readinessScore}%</div>
            <p>Job Ready Level</p>
          </div>
        </section>

        {/* Skills + Chart */}
        <section className="dashboard-grid">
          <div className="glass-box skills">
            <h3>Matched Skills ✅</h3>
            <div className="skill-pills success">
              {matchedSkills.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>

          <div className="glass-box skills">
            <h3>Missing Skills ❌</h3>
            <div className="skill-pills danger">
              {missingSkills.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>

            <div className="card-footer">
              <button
                className="roadmap-btn full"
                onClick={() =>
                  navigate("/acquire-skills", {
                    state: {
                      jobRole,
                      missingSkills,
                    },
                  })
                }
              >
                Acquire Missing Skills →
              </button>
            </div>
          </div>

          <div className="glass-box chart">
            <h3>Skill Gap Analysis</h3>
            <Pie data={pieData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
