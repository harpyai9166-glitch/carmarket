import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-small-title">ABOUT CARMARKET</p>

          <h1>
            Your Trusted
            <span> Used Car Marketplace</span>
          </h1>

          <p>
            We make buying and selling quality used cars
            simple, transparent and convenient.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro">
        <div className="about-intro-content">
          <p className="about-label">WHO WE ARE</p>

          <h2>
            Making Used Car Buying
            <span> Simple & Reliable</span>
          </h2>

          <p>
            CarMarket is a used car marketplace designed to
            connect buyers and sellers in one convenient place.
            Our platform helps users discover cars, compare
            prices and find vehicles according to their needs.
          </p>

          <p>
            Whether you are looking for your first car,
            upgrading your vehicle or selling your existing car,
            CarMarket provides a simple digital experience.
          </p>
        </div>

        <div className="about-stats">
          <div className="about-stat-card">
            <strong>100+</strong>
            <span>Cars Listed</span>
          </div>

          <div className="about-stat-card">
            <strong>50+</strong>
            <span>Verified Sellers</span>
          </div>

          <div className="about-stat-card">
            <strong>10+</strong>
            <span>Locations</span>
          </div>

          <div className="about-stat-card">
            <strong>24/7</strong>
            <span>Online Access</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-features">
        <div className="about-section-heading">
          <p className="about-label">WHY CARMARKET</p>

          <h2>
            Everything You Need
            <span> In One Place</span>
          </h2>

          <p>
            We focus on making the used-car experience easier
            for both buyers and sellers.
          </p>
        </div>

        <div className="about-feature-grid">

          <div className="about-feature-card">
            <div className="about-feature-icon">🚗</div>
            <h3>Wide Choice of Cars</h3>
            <p>
              Explore cars across different brands,
              categories, prices and fuel types.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>
              Search and filter cars by location, brand,
              fuel type, transmission and budget.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">💰</div>
            <h3>Transparent Pricing</h3>
            <p>
              Compare prices and understand the value of
              different vehicles before making a decision.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🤝</div>
            <h3>Connect With Sellers</h3>
            <p>
              Buyers can explore vehicle details and connect
              with sellers through the marketplace.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div>
          <p className="about-label">OUR MISSION</p>

          <h2>
            Making Every Car
            <span> Search Easier</span>
          </h2>

          <p>
            Our goal is to build a convenient marketplace where
            people can discover, compare and sell used cars
            with confidence.
          </p>

          <button
            onClick={() => {
              window.location.href = "/cars";
            }}
          >
            Explore Cars →
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;