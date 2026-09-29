import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("carMarketUser")
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() ===
        formData.email.trim().toLowerCase()
    ) {
      setError("An account with this email already exists.");
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      password: formData.password,
    };

    localStorage.setItem(
      "carMarketUser",
      JSON.stringify(userData)
    );

    setSuccess(
      "Registration successful! Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          Car<span>Market</span>
        </div>

        <p className="register-small-title">
          CREATE ACCOUNT
        </p>

        <h1>Join CarMarket</h1>

        <p className="register-subtitle">
          Create your account to explore and buy used cars.
        </p>

        {error && (
          <div className="register-error">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="register-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="register-form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-group">
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

          <div className="register-form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-submit-btn"
          >
            Create Account →
          </button>

        </form>

        <div className="register-login-text">
          Already have an account?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </div>

        <button
          type="button"
          className="register-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to CarMarket
        </button>

      </div>

    </div>
  );
}

export default Register;