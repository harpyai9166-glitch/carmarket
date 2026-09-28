import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PurchaseRequest.css";

function PurchaseRequest() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // TODAY DATE
  // ==============================

  const today = new Date().toISOString().split("T")[0];

  // ==============================
  // CAR DETAILS CHECK
  // ==============================

  if (!car) {
    return (
      <div className="request-not-found">
        <div>
          <h2>Car details not found</h2>

          <p>Please select a car first.</p>

          <button onClick={() => navigate("/cars")}>
            ← Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ==============================
  // SUBMIT PURCHASE REQUEST
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==============================
    // DATE VALIDATION
    // ==============================

    if (!formData.date) {
      setError("Please select a contact date.");
      return;
    }

    if (formData.date < today) {
      setError("Please select today or a future date.");
      return;
    }

    // ==============================
    // MOBILE VALIDATION
    // ==============================

    const mobileNumber = formData.mobile.trim();

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      // ==============================
      // REQUEST DATA
      // ==============================

      const requestData = {
        carId: car.id,
        carName: car.name,
        carPrice: car.price,

        customerName: formData.name.trim(),
        mobile: mobileNumber,
        email: formData.email.trim(),

        // Always send date as YYYY-MM-DD
        preferredDate: formData.date,

        message: formData.message.trim(),
      };

      console.log("Sending Purchase Request:", requestData);

      // ==============================
      // API REQUEST
      // ==============================

      const response = await axios.post(
        "http://localhost:5000/api/purchase-requests",
        requestData
      );

      console.log(
        "Purchase Request Saved Successfully:",
        response.data
      );

      // ==============================
      // SHOW SUCCESS PAGE
      // ==============================

      setSubmitted(true);
    } catch (error) {
      console.error("Purchase Request Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to submit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SUCCESS PAGE
  // ==============================

  if (submitted) {
    return (
      <div className="request-success-page">
        <div className="request-success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>
            Request Submitted!
          </h1>

          <p>
            Your purchase request for{" "}
            <strong>{car.name}</strong>{" "}
            has been submitted successfully.
          </p>

          <span>
            Our seller will contact you shortly.
          </span>

          <button
            onClick={() => navigate("/cars")}
          >
            ← Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // PURCHASE REQUEST FORM
  // ==============================

  return (
    <div className="purchase-request-page">

      {/* =========================
          TOP BAR
      ========================= */}

      <div className="request-topbar">

        <button
          className="request-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>
          Purchase Request
        </h2>

      </div>

      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div className="request-container">

        {/* =========================
            SELECTED CAR
        ========================= */}

        <div className="request-car-card">

          <img
            src={car.image}
            alt={car.name}
          />

          <div className="request-car-info">

            <span>
              SELECTED CAR
            </span>

            <h2>
              {car.name}
            </h2>

            <strong>
              {car.price}
            </strong>

            <p>
              {car.year} • {car.km} km •{" "}
              {car.fuel} • {car.transmission}
            </p>

            <small>
              📍 {car.location}
            </small>

          </div>

        </div>

        {/* =========================
            REQUEST FORM
        ========================= */}

        <div className="request-form-card">

          <div className="request-heading">

            <span>
              🚗
            </span>

            <div>

              <h1>
                Interested in this car?
              </h1>

              <p>
                Fill in your details and the seller
                will contact you.
              </p>

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME + MOBILE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* DATE */}

            <div className="form-group">

              <label>
                Preferred Contact Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
              />

              <small
                style={{
                  display: "block",
                  marginTop: "6px",
                  color: "#777",
                  fontSize: "12px",
                }}
              >
                You can select today or any future date.
              </small>

            </div>

            {/* MESSAGE */}

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

            </div>

            {/* ERROR */}

            {error && (
              <div
                style={{
                  background: "#fff1f1",
                  border: "1px solid #ffcaca",
                  color: "#d93030",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "18px",
                  fontSize: "13px",
                }}
              >
                ❌ {error}
              </div>
            )}

            {/* SECURITY */}

            <div className="secure-note">
              🔒 Your information is safe and secure.
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="submit-request-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Purchase Request →"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default PurchaseRequest;