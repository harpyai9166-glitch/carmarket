import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("carMarketUser")
    );

    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      formData.email.trim().toLowerCase() !==
        savedUser.email.toLowerCase() ||
      formData.password !== savedUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("carMarketLoggedIn", "true");

    navigate("/");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          Car<span>Market</span>
        </div>

        <p className="login-small-title">
          WELCOME BACK
        </p>

        <h1>Login to Your Account</h1>

        <p className="login-subtitle">
          Access your CarMarket account and continue exploring cars.
        </p>

        {error && (
          <div className="login-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="login-form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
          >
            Login →
          </button>

        </form>

        <div className="login-register-text">
          Don't have an account?
          {" "}
          <Link to="/register">
            Create Account
          </Link>
        </div>

        <button
          type="button"
          className="login-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to CarMarket
        </button>

      </div>

    </div>
  );
}

export default Login;