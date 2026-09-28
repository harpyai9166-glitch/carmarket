import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">

        <div className="logo">
          Car<span>Market</span>
        </div>

        <nav>
          <a href="/" className="active">Home</a>
          <a href="/cars">Used Cars</a>
          <a href="/sell">Sell Car</a>
          <a href="/about">About</a>
        </nav>

        <div className="nav-actions">

          <button className="location-btn">
            📍 Jaipur
          </button>

          <button className="login-btn">
            Login / Register
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-content">

          <p className="small-heading">
            INDIA'S TRUSTED USED CAR MARKETPLACE
          </p>

          <h1>
            Find Your <span>Perfect Car</span>
          </h1>

          <p className="hero-text">
            Buy quality used cars at the best prices.
            Search, compare and purchase your dream car.
          </p>


          {/* ================= SEARCH BOX ================= */}
          <div className="search-box">

            <div className="search-field">

              <label>
                Search Car
              </label>

              <input
                type="text"
                placeholder="Search brand or model"
              />

            </div>


            <div className="search-field">

              <label>
                Location
              </label>

              <select>

                <option>Jaipur</option>
                <option>Delhi</option>
                <option>Alwar</option>
                <option>Gurgaon</option>

              </select>

            </div>


            <div className="search-field">

              <label>
                Budget
              </label>

              <select>

                <option>Any Price</option>
                <option>Under ₹5 Lakh</option>
                <option>₹5 - ₹10 Lakh</option>
                <option>₹10 - ₹20 Lakh</option>
                <option>Above ₹20 Lakh</option>

              </select>

            </div>


            <button className="search-btn">
              🔍 Search Cars
            </button>

          </div>

        </div>

      </section>


      {/* ================= POPULAR CARS ================= */}
      <section className="popular-section">

        <div className="section-heading">

          <div>

            <p>
              EXPLORE
            </p>

            <h2>
              Popular Used Cars
            </h2>

          </div>

          <button className="view-all">
            View All Cars →
          </button>

        </div>


        {/* ================= CAR GRID ================= */}
        <div className="car-grid">


          {/* ================= CAR 1 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
                alt="Mahindra Thar"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Mahindra Thar
              </h3>

              <p className="price">
                ₹13.75 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2022
                </span>

                <span>
                  🛣️ 27K km
                </span>

                <span>
                  ⛽ Diesel
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 2 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80"
                alt="Hyundai Creta"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Hyundai Creta
              </h3>

              <p className="price">
                ₹11.20 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2021
                </span>

                <span>
                  🛣️ 35K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 3 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80"
                alt="Tata Nexon"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Tata Nexon
              </h3>

              <p className="price">
                ₹8.90 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2023
                </span>

                <span>
                  🛣️ 18K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 4 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80"
                alt="BMW 3 Series"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                BMW 3 Series
              </h3>

              <p className="price">
                ₹42.50 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2022
                </span>

                <span>
                  🛣️ 19K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 5 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80"
                alt="Mercedes Benz A-Class"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Mercedes-Benz A-Class
              </h3>

              <p className="price">
                ₹35.90 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2021
                </span>

                <span>
                  🛣️ 24K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 6 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=900&q=80"
                alt="Toyota Fortuner"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Toyota Fortuner
              </h3>

              <p className="price">
                ₹38.75 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2023
                </span>

                <span>
                  🛣️ 16K km
                </span>

                <span>
                  ⛽ Diesel
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 7 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80"
                alt="Honda City"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Honda City
              </h3>

              <p className="price">
                ₹14.20 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2022
                </span>

                <span>
                  🛣️ 32K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 8 ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
                alt="Volkswagen Virtus"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Volkswagen Virtus
              </h3>

              <p className="price">
                ₹16.90 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2023
                </span>

                <span>
                  🛣️ 18K km
                </span>

                <span>
                  ⛽ Petrol
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>



          {/* ================= CAR 9 - NEW ================= */}
          <div className="car-card">

            <div className="car-image">

              <img
                src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80"
                alt="Kia Sonet"
              />

              <button className="favorite-btn">
                ♡
              </button>

            </div>


            <div className="car-info">

              <h3>
                Kia Sonet
              </h3>

              <p className="price">
                ₹7.50 Lakh
              </p>

              <div className="car-details">

                <span>
                  📅 2022
                </span>

                <span>
                  🛣️ 70K km
                </span>

                <span>
                  ⛽ Diesel
                </span>

              </div>

              <button className="details-btn">
                View Details →
              </button>

            </div>

          </div>


        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features">

        <div className="feature">

          <div className="feature-icon">
            ✓
          </div>

          <h3>
            Verified Cars
          </h3>

          <p>
            Every car is carefully verified before listing.
          </p>

        </div>


        <div className="feature">

          <div className="feature-icon">
            ₹
          </div>

          <h3>
            Best Prices
          </h3>

          <p>
            Find quality cars at competitive prices.
          </p>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🛡️
          </div>

          <h3>
            Secure Purchase
          </h3>

          <p>
            Safe and transparent car buying experience.
          </p>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🚚
          </div>

          <h3>
            Easy Process
          </h3>

          <p>
            Simple process from search to purchase.
          </p>

        </div>

      </section>


    </div>
  );
}

export default Home;