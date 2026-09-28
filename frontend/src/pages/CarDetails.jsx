import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CarDetails.css";

function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car;

  const [isFavorite, setIsFavorite] = useState(false);

  // Agar direct URL se page open hua
  if (!car) {
    return (
      <div className="details-not-found">
        <div>
          <h2>Car details not found</h2>
          <p>Please go back and select a car.</p>

          <button onClick={() => navigate("/cars")}>
            ← Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-details-page">

      {/* =========================
          TOP BAR
      ========================= */}

      <div className="details-topbar">
        <button
          className="back-btn"
          onClick={() => navigate("/cars")}
        >
          ← Back to Cars
        </button>

        <div className="details-actions">

          <button
            className={`details-favorite ${
              isFavorite ? "active" : ""
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          <button className="share-btn">
            ↗ Share
          </button>

        </div>
      </div>

      {/* =========================
          MAIN DETAILS
      ========================= */}

      <div className="details-container">

        {/* IMAGE SECTION */}

        <div className="details-image-section">

          <div className="details-image-card">

            <img
              src={car.image}
              alt={car.name}
            />

            <div className="details-verified">
              ✓ Verified Car
            </div>

            <div className="details-image-count">
              1 / 1
            </div>

          </div>

          <div className="image-note">
            ✓ Vehicle inspected & verified
          </div>

        </div>

        {/* INFO SECTION */}

        <div className="details-info">

          <div className="details-tag">
            {car.tag}
          </div>

          <h1>{car.name}</h1>

          <p className="details-location">
            📍 {car.location}
          </p>

          {/* PRICE */}

          <div className="details-price-box">

            <div>
              <span className="price-label">
                Asking Price
              </span>

              <strong>
                {car.price}
              </strong>
            </div>

            <span className="price-status">
              {car.priceTag}
            </span>

          </div>

          {/* SPECS */}

          <div className="details-specs">

            <div className="detail-spec">
              <span>📅</span>

              <div>
                <small>Year</small>
                <strong>{car.year}</strong>
              </div>
            </div>

            <div className="detail-spec">
              <span>🛣️</span>

              <div>
                <small>Kilometres</small>
                <strong>{car.km} km</strong>
              </div>
            </div>

            <div className="detail-spec">
              <span>⛽</span>

              <div>
                <small>Fuel</small>
                <strong>{car.fuel}</strong>
              </div>
            </div>

            <div className="detail-spec">
              <span>⚙️</span>

              <div>
                <small>Transmission</small>
                <strong>{car.transmission}</strong>
              </div>
            </div>

          </div>

          {/* AI REPORT */}

          <div className="details-ai">

            <div className="details-ai-header">

              <div className="ai-title">
                <span>✦</span>

                <div>
                  <strong>AI Expert Report</strong>
                  <small>Smart vehicle analysis</small>
                </div>
              </div>

              <span className="ai-price-tag">
                {car.priceTag}
              </span>

            </div>

            <div className="ai-checks">

              <p>
                <span>✓</span>
                1st owner & accident-free vehicle
              </p>

              <p>
                <span>✓</span>
                {car.km} km driven — documents look clean
              </p>

              <p>
                <span>✓</span>
                Price checked against similar cars
              </p>

            </div>

            <button className="full-report-btn">
              View Full AI Report ↗
            </button>

          </div>

          {/* SELLER */}

          <div className="seller-card">

            <div className="seller-avatar">
              {car.tag === "Direct Owner"
                ? "R"
                : "S"}
            </div>

            <div className="seller-info">

              <small>SELLER</small>

              <strong>
                {car.tag === "Direct Owner"
                  ? "Rahul Sharma"
                  : "Verified Car Dealer"}
              </strong>

              <span>
                ✓ Verified Seller
              </span>

            </div>

            <span className="seller-rating">
              ★ 4.8
            </span>

          </div>

          {/* ACTION BUTTONS */}

          <div className="details-buttons">

            <button className="contact-seller-btn">
              📞 Contact Seller
            </button>

            <button
              className="buy-car-btn"
              onClick={() =>
                navigate("/purchase-request", {
                  state: { car },
                })
              }
            >
              🛒 Buy / Request Car
            </button>

          </div>

          <p className="safe-text">
            🔒 Your contact details are safe and secure
          </p>

        </div>

      </div>

      {/* =========================
          LOWER SECTION
      ========================= */}

      <div className="details-bottom">

        <div className="overview-card">

          <h2>Car Overview</h2>

          <p>
            This {car.name} is available in{" "}
            {car.location}. The vehicle has been
            inspected and verified before listing.
            Check all specifications and seller
            information before making your purchase.
          </p>

          <div className="overview-grid">

            <div>
              <span>Brand</span>
              <strong>{car.brand}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{car.category}</strong>
            </div>

            <div>
              <span>Fuel Type</span>
              <strong>{car.fuel}</strong>
            </div>

            <div>
              <span>Transmission</span>
              <strong>{car.transmission}</strong>
            </div>

            <div>
              <span>Registration</span>
              <strong>{car.location}</strong>
            </div>

            <div>
              <span>Condition</span>
              <strong>Verified</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CarDetails;