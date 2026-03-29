import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Scroll to Learn More
  const scrollToLearnMore = () => {
    document
      .getElementById("learn-more")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Scroll-based fade-in animation
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="home-bg">
        <div className="home-container fade-section">
          {/* LEFT CONTENT */}
          <div className="home-left">
            <h1 className="home-title">
              Build Job‑Ready Skills with <span>SkillSync</span>
            </h1>

            <p className="home-subtitle">
              An Education 2.0 platform that bridges the gap between
              college learning and real industry needs through
              personalized skill gap analysis.
            </p>

            <div className="home-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>

              <button
                className="secondary-btn"
                onClick={scrollToLearnMore}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="home-right">
            <div className="glass-card">
              <h2>How SkillSync Works</h2><br></br>
              <ul>
                <li>Enter Skills</li>
                <li>Select Target Job Role</li>
                <li>Identify Skill Gaps</li>
                <li>Get Learning Roadmap</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LEARN MORE SECTION ================= */}
      <section id="learn-more" className="learn-more-section">
        <h2 className="fade-section">Learn More About SkillSync</h2>

        <div className="learn-box fade-section">
          <h3>The Problem</h3>
          <p>
            Despite earning degrees, many graduates remain unemployable
            due to a mismatch between academic curriculum and rapidly
            evolving industry skill requirements.
          </p>
        </div>

        <div className="learn-box fade-section">
          <h3>Our Solution</h3>
          <p>
            SkillSync compares a student’s existing skills with real
            industry job roles to identify gaps and generate
            personalized learning paths.
          </p>
        </div>

        <div className="learn-box fade-section">
          <h3>How SkillSync Works</h3>
          <ol>
            <li>Upload resume or enter skills</li>
            <li>Select desired job role</li>
            <li>Perform skill gap analysis</li>
            <li>Receive roadmap & readiness score</li>
          </ol>
        </div>

        <div className="learn-box fade-section">
          <h3>Who Benefits</h3>
          <ul>
            <li>Students – career clarity & employability</li>
            <li>Colleges – curriculum alignment</li>
            <li>Recruiters – skill‑based assessment</li>
          </ul>
        </div>

        <div className="learn-box fade-section">
          <h3>Education 2.0 Alignment</h3>
          <p>
            SkillSync promotes outcome‑based, personalized, and
            industry‑aligned learning with continuous upskilling.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
