import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";

function SkillSelect() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const jobRole = localStorage.getItem("jobRole");

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`http://localhost:5000/api/skills/${jobRole}`);
        const data = await res.json();
        setSkills(data.skills);
      } catch (e) {
        setError("Failed to fetch skills from backend");
      }
    }
    if (jobRole) fetchSkills();
  }, [jobRole]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSkills.length === 0) {
      setError("Please select at least one skill");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          jobRole,
          selectedSkills,
        }),
      });

      const data = await res.json();

      localStorage.setItem("analysisResult", JSON.stringify(data));

      navigate("/dashboard");
    } catch (e) {
      setError("Analysis failed (backend not reachable)");
    }
  };

  return (
    <div className="student-bg">
      <div className="student-card" style={{ width: "450px" }}>
        <h2>Select Your Skills</h2>
        <p>Job Role: <b>{jobRole}</b></p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ textAlign: "left", marginTop: "15px" }}>
          {skills.map((skill) => (
            <label key={skill} style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />{" "}
              {skill}
            </label>
          ))}
        </div>

        <button style={{ marginTop: "20px" }} onClick={handleAnalyze}>
          Analyze Skill Gap →
        </button>
      </div>
    </div>
  );
}

export default SkillSelect;
