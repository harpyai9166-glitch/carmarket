import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // Remove accidental spaces
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    // Admin credentials
    const ADMIN_EMAIL = "kushalalw123@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      // Save admin login
      localStorage.setItem("isAdminLoggedIn", "true");

      // Go to dashboard
      navigate("/admin", { replace: true });
    } else {
      setError(
        "Invalid admin email or password. Please check your credentials."
      );

      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* LOGO */}
        <div className="admin-login-logo">
          🚗
        </div>

        <div className="admin-login-heading">

          <span>
            ADMIN PANEL
          </span>

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to manage your CarMarket dashboard.
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="admin-login-error">
            ❌ {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />

          </div>

          <div className="admin-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Login to Dashboard →"}
          </button>

        </form>

        {/* BACK */}
        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to CarMarket
        </button>

        {/* SECURITY */}
        <div className="admin-login-secure">
          🔒 Secure Admin Access
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;