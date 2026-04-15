import { Link } from "react-router-dom";

export default function About() {
  return (
    <div
      style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="py-5"
    >
      <div className="container" style={{ maxWidth: "750px" }}>
        <div className="mb-5">
          <p className="text-secondary text-uppercase small fw-semibold mb-2">
            About this project
          </p>
          <h1 className="text-white fw-bold mb-3">
            Built to solve a real problem
          </h1>
          <p className="text-secondary" style={{ lineHeight: "1.8" }}>
            Most students and job seekers submit resumes without any objective
            feedback. Professional resume reviews are expensive, and free tools
            are too generic. I built this to change that.
          </p>
        </div>

        <div className="mb-5">
          <h5 className="text-white fw-bold mb-3">How it works</h5>
          <div className="d-flex flex-column gap-3">
            {[
              {
                step: "01",
                title: "Upload your resume",
                desc: "Upload a PDF or Word file, or paste your resume text directly.",
              },
              {
                step: "02",
                title: "AI reads it",
                desc: "Sent to Groq's Llama 3.3 70B model, prompted to think like a senior recruiter.",
              },
              {
                step: "03",
                title: "Get your analysis",
                desc: "Score out of 100, strengths, weaknesses, missing sections, and tips.",
              },
              {
                step: "04",
                title: "Track progress",
                desc: "Every analysis is saved so you can track improvement over time.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="d-flex gap-4 p-4 rounded-3"
                style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #21262d",
                }}
              >
                <span className="text-primary fw-bold fs-5">{s.step}</span>
                <div>
                  <h6 className="text-white fw-semibold mb-1">{s.title}</h6>
                  <p className="text-secondary small mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h5 className="text-white fw-bold mb-3">Why I built this</h5>
          <p className="text-secondary mb-3" style={{ lineHeight: "1.8" }}>
            As a CS student at Jamia Hamdard University, I have seen how
            students struggle to evaluate their own resumes without access to
            mentors or career coaches.
          </p>
          <p className="text-secondary mb-0" style={{ lineHeight: "1.8" }}>
            This project combines full-stack MERN development with real AI
            integration to build something genuinely useful — not just a
            portfolio piece.
          </p>
        </div>

        <div
          className="p-4 rounded-3"
          style={{ backgroundColor: "#161b22", border: "1px solid #21262d" }}
        >
          <h5 className="text-white fw-bold mb-3">Built by</h5>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-white fw-semibold mb-0">Yash Kumar</p>
              <p className="text-secondary small mb-0">
                CS Student · Jamia Hamdard University
              </p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://github.com/yashhK11"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary btn-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yashhkumarr/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
