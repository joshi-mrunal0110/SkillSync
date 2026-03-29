import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AcquireSkills.css";

function AcquireSkills() {
  const location = useLocation();
  const navigate = useNavigate();

  // SAFE ACCESS (prevents crash)
  const jobRole = location.state?.jobRole;
  const missingSkills = location.state?.missingSkills;

  const [duration, setDuration] = useState(1); // 1,3,6 months
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if opened directly
  useEffect(() => {
    if (!jobRole || !missingSkills) {
      navigate("/dashboard");
    }
  }, [jobRole, missingSkills, navigate]);

  // Fetch AI roadmap
  useEffect(() => {
    if (!jobRole || !missingSkills) return;

    setLoading(true);
    setError("");

    fetch("http://localhost:5000/api/ai/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobRole,
        missingSkills,
        duration,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("AI API not reachable");
        return res.json();
      })
      .then((data) => {
        setRoadmap(Array.isArray(data.roadmap) ? data.roadmap : []);
      })
      .catch(() => {
        setError("Failed to generate roadmap. Please try again.");
        setRoadmap([]);
      })
      .finally(() => setLoading(false));
  }, [jobRole, missingSkills, duration]);

  // Update progress + dashboard readiness
  const updateProgress = (skillTitle, status) => {
    setProgress((prev) => ({ ...prev, [skillTitle]: status }));

    if (status !== "Completed") return;

    const analysis = JSON.parse(localStorage.getItem("analysisResult"));
    if (!analysis) return;

    // Find correct missing skill
    const matchedMissingSkill = analysis.missingSkills.find((ms) =>
      skillTitle.toLowerCase().includes(ms.toLowerCase()),
    );

    if (!matchedMissingSkill) return;

    if (analysis.matchedSkills.includes(matchedMissingSkill)) return;

    // 🔥 IMPORTANT: store original total count BEFORE updating
    const originalTotal =
      analysis.matchedSkills.length + analysis.missingSkills.length;

    const updatedMatched = [...analysis.matchedSkills, matchedMissingSkill];

    const updatedMissing = analysis.missingSkills.filter(
      (s) => s !== matchedMissingSkill,
    );

    const newScore = Math.round((updatedMatched.length / originalTotal) * 100);

    const updatedAnalysis = {
      ...analysis,
      matchedSkills: updatedMatched,
      missingSkills: updatedMissing,
      readinessScore: Math.min(newScore, 100),
    };

    localStorage.setItem("analysisResult", JSON.stringify(updatedAnalysis));

    // Remove roadmap cards of that skill
    setRoadmap((prev) =>
      prev.filter(
        (item) =>
          !item.skill.toLowerCase().includes(matchedMissingSkill.toLowerCase()),
      ),
    );
  };

  const completedCount = Object.values(progress).filter(
    (v) => v === "Completed",
  ).length;

  const readinessBoost = completedCount * 5;

  if (!jobRole || !missingSkills) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="acquire-layout">
      <header className="acquire-header">
        <h2>AI‑Powered Skill Roadmap 🚀</h2>
        <p>
          Role: <b>{jobRole}</b>
        </p>
        <div className="readiness-badge">
          Readiness Boost: +{readinessBoost}%
        </div>
      </header>

      {/* Timeline selector */}
      <div className="timeline-selector">
        {[1, 3, 6].map((d) => (
          <button
            key={d}
            className={duration === d ? "active" : ""}
            onClick={() => setDuration(d)}
          >
            {d} Month{d > 1 && "s"}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Generating roadmap with AI...</p>}
      {error && <p className="error">{error}</p>}

      {/* Roadmap cards */}
      <section className="roadmap">
        {roadmap.map((item, i) => (
          <div className="skill-card" key={i}>
            <div className="skill-header">
              <h3>{item.skill}</h3>
              <span>Week {item.week}</span>
            </div>

            <div className="status-buttons">
              {["Not Started", "In Progress", "Completed"].map((s) => (
                <button
                  key={s}
                  className={progress[item.skill] === s ? "active" : ""}
                  onClick={() => updateProgress(item.skill, s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="resources">
              <h4>Resources</h4>
              <ul>
                {item.resources.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="project">
              <h4>Mini Project</h4>
              <p>{item.project}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="footer">
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard →
        </button>
      </div>
    </div>
  );
}

export default AcquireSkills;
