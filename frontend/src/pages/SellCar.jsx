import { useState } from "react";
import axios from "axios";
import "./SellCar.css";

function SellCar() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    brand: "",
    model: "",
    year: "",
    kmDriven: "",
    fuel: "",
    city: "",
    expectedPrice: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // SUBMIT SELL CAR FORM
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile validation
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Loading start
    setLoading(true);

    try {
      const response = await axios.post(
        "https://carmarket-backend-966q.onrender.com/api/sell-cars",
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          brand: formData.brand,
          model: formData.model,
          year: Number(formData.year),
          kmDriven: Number(formData.kmDriven),
          fuel: formData.fuel,
          city: formData.city,
          expectedPrice: Number(formData.expectedPrice),
          description: formData.description,
        }
      );

      console.log("Sell Car Saved:", response.data);

      // Show success screen
      setSubmitted(true);
    } catch (error) {
      console.error("Sell Car Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to submit car details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // RESET FORM
  // ==============================
  const resetForm = () => {
    setSubmitted(false);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      brand: "",
      model: "",
      year: "",
      kmDriven: "",
      fuel: "",
      city: "",
      expectedPrice: "",
      description: "",
    });
  };

  return (
    <div className="sell-car-page">

      {/* ================= NAVBAR ================= */}
      <nav className="sell-navbar">

        <div className="sell-logo">
          Car<span>Market</span>
        </div>

        <div className="sell-nav-links">
          <a href="/">Home</a>

          <a href="/cars">
            Used Cars
          </a>

          <a
            href="/sell"
            className="active"
          >
            Sell Car
          </a>

          <a href="/about">
            About
          </a>
        </div>

        <div className="sell-location">
          📍 Jaipur
        </div>

      </nav>

      {/* ================= HERO ================= */}
      <section className="sell-hero">

        <div className="sell-hero-content">

          <p className="sell-small-title">
            SELL YOUR CAR
          </p>

          <h1>
            Sell Your Car at the
            <span> Best Price</span>
          </h1>

          <p>
            Get the right value for your car with a simple,
            transparent and hassle-free selling process.
          </p>

        </div>

      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="sell-container">

        {/* ================= LEFT INFO ================= */}
        <div className="sell-info">

          <h2>
            Why Sell Your Car With Us?
          </h2>

          <p className="sell-info-text">
            We make selling your used car simple, quick and
            transparent.
          </p>

          {/* BENEFIT 1 */}
          <div className="sell-benefit">

            <div className="benefit-icon">
              💰
            </div>

            <div>
              <h3>
                Best Market Price
              </h3>

              <p>
                Get a competitive price based on your car's
                current market value.
              </p>
            </div>

          </div>

          {/* BENEFIT 2 */}
          <div className="sell-benefit">

            <div className="benefit-icon">
              ⚡
            </div>

            <div>
              <h3>
                Quick Process
              </h3>

              <p>
                Submit your car details and our team will
                contact you shortly.
              </p>
            </div>

          </div>

          {/* BENEFIT 3 */}
          <div className="sell-benefit">

            <div className="benefit-icon">
              🛡️
            </div>

            <div>
              <h3>
                Trusted & Secure
              </h3>

              <p>
                A simple and transparent process without
                unnecessary complications.
              </p>
            </div>

          </div>

          {/* BENEFIT 4 */}
          <div className="sell-benefit">

            <div className="benefit-icon">
              🤝
            </div>

            <div>
              <h3>
                Expert Assistance
              </h3>

              <p>
                Our team helps you throughout the selling
                process.
              </p>
            </div>

          </div>

        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="sell-form-card">

          {!submitted ? (

            <>
              {/* FORM HEADER */}
              <div className="sell-form-header">

                <p>
                  GET STARTED
                </p>

                <h2>
                  Tell Us About Your Car
                </h2>

                <span>
                  Fill in the details below and we'll get
                  back to you.
                </span>

              </div>

              {/* ================= FORM ================= */}
              <form onSubmit={handleSubmit}>

                {/* CUSTOMER DETAILS */}
                <div className="form-section-title">
                  Personal Details
                </div>

                <div className="form-row">

                  {/* FULL NAME */}
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

                  {/* MOBILE */}
                  <div className="form-group">

                    <label>
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter mobile number"
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

                {/* CAR DETAILS */}
                <div className="form-section-title">
                  Car Details
                </div>

                <div className="form-row">

                  {/* BRAND */}
                  <div className="form-group">

                    <label>
                      Car Brand
                    </label>

                    <input
                      type="text"
                      name="brand"
                      placeholder="e.g. Hyundai"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* MODEL */}
                  <div className="form-group">

                    <label>
                      Car Model
                    </label>

                    <input
                      type="text"
                      name="model"
                      placeholder="e.g. Creta"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="form-row">

                  {/* YEAR */}
                  <div className="form-group">

                    <label>
                      Registration Year
                    </label>

                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Year
                      </option>

                      {Array.from(
                        { length: 20 },
                        (_, index) => {

                          const year =
                            new Date().getFullYear() -
                            index;

                          return (
                            <option
                              key={year}
                              value={year}
                            >
                              {year}
                            </option>
                          );

                        }
                      )}

                    </select>

                  </div>

                  {/* KM */}
                  <div className="form-group">

                    <label>
                      KM Driven
                    </label>

                    <input
                      type="number"
                      name="kmDriven"
                      placeholder="e.g. 45000"
                      value={formData.kmDriven}
                      onChange={handleChange}
                      min="0"
                      required
                    />

                  </div>

                </div>

                <div className="form-row">

                  {/* FUEL */}
                  <div className="form-group">

                    <label>
                      Fuel Type
                    </label>

                    <select
                      name="fuel"
                      value={formData.fuel}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Fuel
                      </option>

                      <option value="Petrol">
                        Petrol
                      </option>

                      <option value="Diesel">
                        Diesel
                      </option>

                      <option value="CNG">
                        CNG
                      </option>

                      <option value="Electric">
                        Electric
                      </option>

                      <option value="Hybrid">
                        Hybrid
                      </option>

                    </select>

                  </div>

                  {/* CITY */}
                  <div className="form-group">

                    <label>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Jaipur"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                {/* EXPECTED PRICE */}
                <div className="form-group">

                  <label>
                    Expected Price
                  </label>

                  <input
                    type="number"
                    name="expectedPrice"
                    placeholder="₹ Enter expected price"
                    value={formData.expectedPrice}
                    onChange={handleChange}
                    min="0"
                    required
                  />

                </div>

                {/* DESCRIPTION */}
                <div className="form-group">

                  <label>
                    Additional Information
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Tell us more about your car..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="sell-submit-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Submitting..."
                    : "Submit Car Details"}

                  {!loading && (
                    <span>
                      →
                    </span>
                  )}

                </button>

                <p className="form-note">
                  🔒 Your information is safe and secure
                  with us.
                </p>

              </form>
            </>

          ) : (

            /* ================= SUCCESS ================= */
            <div className="sell-success">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Details Submitted!
              </h2>

              <p>
                Thank you for submitting your car details.
                Our team will contact you shortly.
              </p>

              <button
                className="sell-again-btn"
                onClick={resetForm}
              >
                Submit Another Car
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default SellCar;