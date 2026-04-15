import { Link } from "react-router-dom";

const ticker = [
  "AI-Powered Resume Analysis",
  "Instant Score out of 100",
  "Strengths & Weaknesses",
  "Missing Sections Detected",
  "Actionable Improvement Tips",
  "Powered by Groq AI",
  "Free to Use",
  "Secure & Private",
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="text-center py-5 px-3"
        style={{ borderBottom: "1px solid #21262d" }}
      >
        <span
          className="badge bg-secondary mb-4"
          style={{ fontSize: "0.75rem", padding: "6px 14px" }}
        >
          Powered by Groq AI · Llama 3.3 70B
        </span>
        <h1
          className="fw-bold text-white mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2 }}
        >
          Your resume, <span className="text-primary">brutally honest.</span>
        </h1>
        <p
          className="text-secondary mb-4 mx-auto"
          style={{ maxWidth: "520px", fontSize: "1.05rem" }}
        >
          Upload your resume and get an instant AI score, pinpointed strengths,
          weaknesses, and actionable tips — in seconds.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/signup" className="btn btn-primary btn-lg px-5">
            Get Started Free
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
            Login
          </Link>
        </div>
      </div>

      {/* Ticker */}
      <div
        style={{
          backgroundColor: "#161b22",
          borderBottom: "1px solid #21262d",
          overflow: "hidden",
          padding: "14px 0",
        }}
      >
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 20s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              style={{
                whiteSpace: "nowrap",
                padding: "0 32px",
                color: "#8b949e",
                fontSize: "0.85rem",
              }}
            >
              · {item}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container py-5">
        <p
          className="text-secondary text-uppercase small fw-semibold text-center mb-4"
          style={{ letterSpacing: "0.1em" }}
        >
          What you get
        </p>
        <div className="row g-4">
          {[
            {
              icon: "🎯",
              title: "Score out of 100",
              desc: "Get an objective, AI-generated rating of your resume quality based on industry standards.",
            },
            {
              icon: "💪",
              title: "Strengths & Gaps",
              desc: "Know exactly what's working and what's holding you back from landing interviews.",
            },
            {
              icon: "📋",
              title: "Missing Sections",
              desc: "Find out which key sections recruiters expect but your resume is missing.",
            },
            {
              icon: "🚀",
              title: "Actionable Tips",
              desc: "Get clear, specific steps you can take right now to improve your resume score.",
            },
            {
              icon: "⚡",
              title: "Instant Results",
              desc: "No waiting. Get your full analysis in seconds, powered by Llama 3.3 70B.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your resume data is never stored beyond your analysis session.",
            },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="h-100 p-4 rounded-3"
                style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #21262d",
                }}
              >
                <div style={{ fontSize: "1.8rem" }} className="mb-3">
                  {f.icon}
                </div>
                <h6 className="text-white fw-bold mb-2">{f.title}</h6>
                <p className="text-secondary small mb-0">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container pb-5 text-center">
        <div
          className="p-5 rounded-3"
          style={{ backgroundColor: "#161b22", border: "1px solid #21262d" }}
        >
          <h2 className="text-white fw-bold mb-3">
            Ready to improve your resume?
          </h2>
          <p className="text-secondary mb-4">
            Get instant AI feedback — free, fast, and honest.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg px-5">
            Analyze for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
