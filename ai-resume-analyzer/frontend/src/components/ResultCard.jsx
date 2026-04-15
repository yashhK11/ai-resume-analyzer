export default function ResultCard({ result }) {
  const sections = [
    {
      label: "Strengths",
      items: result.strengths,
      color: "success",
      icon: "💪",
    },
    {
      label: "Weaknesses",
      items: result.weaknesses,
      color: "danger",
      icon: "⚠️",
    },
    {
      label: "Missing Sections",
      items: result.missing_sections,
      color: "warning",
      icon: "📋",
    },
    {
      label: "Improvement Tips",
      items: result.tips,
      color: "info",
      icon: "🚀",
    },
  ];

  return (
    <div className="container mt-5 pb-5" style={{ maxWidth: "700px" }}>
      <div className="card-dark p-4 mb-4 text-center">
        <p className="text-secondary small text-uppercase mb-3">
          Overall Score
        </p>
        <div className="score-circle mb-3">
          <div>
            <span className="text-white fw-bold" style={{ fontSize: "2.5rem" }}>
              {result.score}
            </span>
            <span className="text-secondary">/100</span>
          </div>
        </div>
        <div className="progress mt-3" style={{ height: "8px" }}>
          <div
            className={`progress-bar ${result.score >= 70 ? "bg-success" : result.score >= 50 ? "bg-warning" : "bg-danger"}`}
            style={{ width: `${result.score}%`, transition: "width 1s ease" }}
          />
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {sections.map((section) => (
          <div key={section.label} className="card-dark p-4">
            <p
              className={`text-${section.color} small fw-semibold text-uppercase mb-3`}
            >
              {section.icon} {section.label}
            </p>
            <ul className="text-secondary mb-0 ps-3">
              {section.items.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
