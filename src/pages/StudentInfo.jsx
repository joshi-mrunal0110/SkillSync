import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";

function StudentInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    degree: "",
    graduationYear: "",
    jobRole: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // store student info + job role
    localStorage.setItem("studentInfo", JSON.stringify(formData));
    localStorage.setItem("jobRole", formData.jobRole);

    // go to skills page
    navigate("/select-skills");
  };

  return (
    <div className="student-bg">
      <div className="student-card">
        <h2>Student Information</h2>
        <p>Tell us about yourself to personalize your journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender (e.g. Male, Female)"
            required
            value={formData.gender}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="degree"
            placeholder="Degree (e.g. B.Tech, B.Sc)"
            required
            value={formData.degree}
            onChange={handleChange}
          />

          <input
            type="number"
            name="graduationYear"
            placeholder="Year of Graduation"
            required
            value={formData.graduationYear}
            onChange={handleChange}
          />

          <select
            name="jobRole"
            required
            value={formData.jobRole}
            onChange={handleChange}
          >
            <option value="">Select Job Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="UI UX Designer">UI UX Designer</option>
            <option value="AI ML Engineer">AI ML Engineer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>         
          </select>

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default StudentInfo;
