import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-dark py-3"
      style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span className="badge bg-primary">AI</span>
          Resume Analyzer
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link to="/about" className="text-decoration-none text-secondary">
            About
          </Link>
          {token ? (
            <>
              <Link
                to="/analyze"
                className="text-decoration-none text-secondary"
              >
                Analyze
              </Link>
              <Link
                to="/history"
                className="text-decoration-none text-secondary"
              >
                History
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-decoration-none text-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
