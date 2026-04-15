import { useEffect, useState } from "react";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      setAnalyses(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading)
    return (
      <div
        style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="spinner-border text-primary" />
      </div>
    );

  return (
    <div
      style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="py-5"
    >
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="mb-4">
          <h2 className="text-white fw-bold mb-1">History</h2>
          <p className="text-secondary">
            {analyses.length} past{" "}
            {analyses.length === 1 ? "analysis" : "analyses"}
          </p>
        </div>

        {analyses.length === 0 ? (
          <div className="card-dark p-5 text-center">
            <p className="text-secondary mb-0">
              No analyses yet. Go analyze your resume!
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {analyses.map((a) => (
              <div key={a._id} className="card-dark p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <span className="text-white fw-bold fs-3">{a.score}</span>
                    <span className="text-secondary">/100</span>
                  </div>
                  <span className="badge bg-secondary">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="progress mb-3" style={{ height: "6px" }}>
                  <div
                    className={`progress-bar ${a.score >= 70 ? "bg-success" : a.score >= 50 ? "bg-warning" : "bg-danger"}`}
                    style={{ width: `${a.score}%` }}
                  />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <p className="text-success small fw-semibold mb-2">
                      STRENGTHS
                    </p>
                    <ul className="text-secondary small ps-3 mb-0">
                      {a.strengths.slice(0, 2).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6">
                    <p className="text-danger small fw-semibold mb-2">
                      WEAKNESSES
                    </p>
                    <ul className="text-secondary small ps-3 mb-0">
                      {a.weaknesses.slice(0, 2).map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
