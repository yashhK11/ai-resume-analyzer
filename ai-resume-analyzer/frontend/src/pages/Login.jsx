import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("token", data.token);
      navigate("/analyze");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div
        className="card-dark p-5"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h2 className="text-white fw-bold mb-1">Welcome back</h2>
        <p className="text-secondary mb-4">Sign in to your account</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <div className="mb-3">
          <label className="form-label text-secondary small">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label className="form-label text-secondary small">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary w-100"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-secondary text-center mt-4 mb-0 small">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
