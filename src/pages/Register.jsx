import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/student-info");
    } catch (err) {
      setError("Backend not reachable");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="email" placeholder="Email" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
          <button type="submit">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
