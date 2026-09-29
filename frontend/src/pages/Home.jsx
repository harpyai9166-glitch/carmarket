import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState("Jaipur");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const locations = [
    {
      name: "Ahmedabad",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Chandigarh",
      image:
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Chennai",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Delhi NCR",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Gurgaon",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Noida",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Pune",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearch.trim().toLowerCase())
  );

  const locationAliases = {
    delhi: "Delhi NCR",
    "new delhi": "New Delhi",
    bangalore: "Bangalore",
    bengaluru: "Bangalore",
    chennai: "Chennai",
    jaipur: "Jaipur",
    mumbai: "Mumbai",
    pune: "Pune",
    noida: "Noida",
    gurgaon: "Gurgaon",
    hyderabad: "Hyderabad",
    ahmedabad: "Ahmedabad",
    chandigarh: "Chandigarh",
  };

  const handleTypedLocation = () => {
    const typed = locationSearch.trim().toLowerCase();
    if (!typed) return;

    const exact = locations.find(
      (location) => location.name.toLowerCase() === typed
    );

    const matchedName =
      exact?.name ||
      locationAliases[typed] ||
      locations.find((location) =>
        location.name.toLowerCase().includes(typed)
      )?.name;

    if (matchedName) {
      handleLocationChange(matchedName);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setShowLocationMenu(false);
    navigate(`/cars?location=${encodeURIComponent(location)}`);
  };

  const continueWithLocation = (location) => {
    setSelectedLocation(location);
    setShowLocationMenu(false);
    navigate(`/cars?location=${encodeURIComponent(location)}`);
  };

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

          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="location-btn"
              onClick={() => setShowLocationMenu((prev) => !prev)}
            >
              📍 {selectedLocation}
            </button>

            {showLocationMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: "150px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  padding: "6px",
                  zIndex: 1000,
                }}
              >
                {locations.slice(0, 4).map((location) => (
                  <button
                    key={location.name}
                    type="button"
                    onClick={() => handleLocationChange(location.name)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 12px",
                      border: "none",
                      borderRadius: "7px",
                      background:
                        selectedLocation === location.name ? "#f3f4f6" : "transparent",
                      color: "#111827",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    📍 {location.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="login-btn"
            type="button"
            onClick={() => {
              setShowLoginModal(true);
              setLoginMessage("");
              setOtpSent(false);
              setOtp("");
            }}
          >
            Login / Register
          </button>

        </div>

      </header>


      {/* ================= LOGIN / REGISTER MODAL ================= */}
      {showLoginModal && (
        <div
          onClick={() => setShowLoginModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.62)",
            zIndex: 6000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px",
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(865px, 100%)",
              minHeight: "600px",
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.28)",
              display: "grid",
              gridTemplateColumns: "38% 62%",
              position: "relative",
            }}
          >
            {/* LEFT ILLUSTRATION PANEL */}
            <div
              style={{
                background: "#f8f8f8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                minHeight: "600px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  background: "#fff",
                  bottom: "65px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "235px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "118px",
                    height: "118px",
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "64px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  }}
                >
                  👨🏻‍💻
                </div>

                <div
                  style={{
                    width: "115px",
                    height: "175px",
                    margin: "-8px auto 0",
                    borderRadius: "65px 65px 28px 28px",
                    background: "#fff",
                    border: "2px solid #20242d",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "64px",
                      height: "112px",
                      right: "-24px",
                      top: "58px",
                      borderRadius: "16px",
                      background: "#20242d",
                      transform: "rotate(18deg)",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "88px",
                        background: "#fff",
                        borderRadius: "10px",
                        margin: "6px",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      width: "70px",
                      height: "45px",
                      right: "-62px",
                      top: "8px",
                      borderRadius: "22px",
                      background: "#ff4b35",
                      color: "#fff",
                      fontSize: "27px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    👍
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      width: "78px",
                      height: "43px",
                      right: "-75px",
                      top: "67px",
                      background: "#fff",
                      border: "2px solid #ff4b35",
                      borderRadius: "8px",
                      color: "#ff4b35",
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    💬
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT LOGIN PANEL */}
            <div
              style={{
                padding: "46px 48px",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                aria-label="Close login"
                style={{
                  position: "absolute",
                  right: "22px",
                  top: "18px",
                  border: "none",
                  background: "transparent",
                  color: "#30343b",
                  fontSize: "30px",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              <h2
                style={{
                  margin: "0 45px 5px 0",
                  fontSize: "29px",
                  lineHeight: 1.2,
                  color: "#252a33",
                  fontWeight: 700,
                }}
              >
                Login or Register
              </h2>

              <p
                style={{
                  margin: "0 0 22px",
                  color: "#8a8d94",
                  fontSize: "17px",
                  lineHeight: 1.35,
                }}
              >
                for Better Experience, Order tracking &amp; Regular updates
              </p>

              <div
                style={{
                  border: "1px solid #ff3b3b",
                  borderRadius: "10px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 18px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "13px",
                      color: "#555b64",
                      marginBottom: "2px",
                    }}
                  >
                    Mobile Number
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "17px",
                        color: "#252a33",
                        marginRight: "4px",
                      }}
                    >
                      +91
                    </strong>

                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setMobileNumber(value);
                        setLoginMessage("");
                      }}
                      placeholder=""
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        fontSize: "17px",
                        color: "#252a33",
                        background: "transparent",
                      }}
                    />
                  </div>
                </div>
              </div>

              {mobileNumber.length > 0 && mobileNumber.length < 10 && (
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#ff3b3b",
                    fontSize: "13px",
                  }}
                >
                  Please enter valid mobile number
                </p>
              )}

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => {
                    if (mobileNumber.length !== 10) {
                      setLoginMessage("Please enter a valid 10-digit mobile number.");
                      return;
                    }

                    setOtpSent(true);
                    setLoginMessage(
                      "Demo OTP sent: 123456 (real SMS OTP will be connected later)."
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "57px",
                    marginTop: "18px",
                    border: "none",
                    borderRadius: "10px",
                    background:
                      mobileNumber.length === 10 ? "#ff3b3b" : "#bcbec1",
                    color: "#fff",
                    fontSize: "17px",
                    fontWeight: 700,
                    cursor:
                      mobileNumber.length === 10 ? "pointer" : "not-allowed",
                  }}
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div
                    style={{
                      marginTop: "18px",
                      border: "1px solid #d9dce1",
                      borderRadius: "10px",
                      padding: "13px 15px",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        color: "#555b64",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      Enter OTP
                    </label>

                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 123456"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "18px",
                        letterSpacing: "4px",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (otp === "123456") {
                        localStorage.setItem("carMarketUser", mobileNumber);
                        setLoginMessage("Login successful.");
                      } else {
                        setLoginMessage("Invalid OTP. For demo use 123456.");
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "57px",
                      marginTop: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#ff3b3b",
                      color: "#fff",
                      fontSize: "17px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Verify &amp; Continue
                  </button>
                </>
              )}

              {loginMessage && (
                <p
                  style={{
                    margin: "10px 0 0",
                    color: loginMessage.includes("successful")
                      ? "#15803d"
                      : "#666b74",
                    fontSize: "13px",
                    lineHeight: 1.4,
                  }}
                >
                  {loginMessage}
                </p>
              )}

              <p
                style={{
                  margin: "22px 0 0",
                  color: "#8a8d94",
                  fontSize: "13px",
                  lineHeight: 1.65,
                }}
              >
                By proceeding, I confirm that I have received, read, and agree
                to our{" "}
                <u>Marketing Communication</u>, <u>Data Sharing</u>,{" "}
                <u>Privacy Policy</u>, <u>Terms &amp; Conditions</u> and{" "}
                <u>Consent Declaration</u>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= LOCATION MODAL ================= */}
      {showLocationMenu && (
        <div
          onClick={() => setShowLocationMenu(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.35)",
            backdropFilter: "blur(2px)",
            zIndex: 5000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "58px",
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(760px, calc(100% - 32px))",
              background: "#ffffff",
              borderRadius: "0 0 10px 10px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              padding: "28px 26px 30px",
              position: "relative",
              fontFamily: "inherit",
            }}
          >
            <button
              type="button"
              onClick={() => setShowLocationMenu(false)}
              aria-label="Close location"
              style={{
                position: "absolute",
                top: "10px",
                right: "14px",
                border: "none",
                background: "transparent",
                color: "#6b7280",
                fontSize: "30px",
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2
              style={{
                margin: "0 35px 6px 0",
                color: "#20242d",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              What is your location?
            </h2>

            <p
              style={{
                margin: "0 0 18px",
                color: "#777b84",
                fontSize: "14px",
              }}
            >
              In which city are you looking to buy your car?
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    height: "62px",
                    background: "#f1f3f7",
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 18px",
                    color: "#777b84",
                    fontSize: "16px",
                    border:
                      locationSearch.trim() ? "1px solid #20242d" : "1px solid transparent",
                  }}
                >
                  <span style={{ fontSize: "23px", marginRight: "14px" }}>⌕</span>

                  <input
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleTypedLocation();
                      }
                    }}
                    placeholder="Select your City"
                    aria-label="Search city"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "16px",
                      color: "#20242d",
                    }}
                  />
                </div>

                {locationSearch.trim() && filteredLocations.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "66px",
                      background: "#fff",
                      borderRadius: "0 0 9px 9px",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.14)",
                      border: "1px solid #e5e7eb",
                      zIndex: 20,
                      overflow: "hidden",
                    }}
                  >
                    {filteredLocations.slice(0, 5).map((location) => (
                      <button
                        key={location.name}
                        type="button"
                        onClick={() => handleLocationChange(location.name)}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "#fff",
                          textAlign: "left",
                          padding: "11px 18px",
                          fontSize: "17px",
                          color: "#343840",
                          cursor: "pointer",
                        }}
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                )}

                {locationSearch.trim() && filteredLocations.length === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "66px",
                      background: "#fff",
                      padding: "12px 18px",
                      borderRadius: "0 0 9px 9px",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.14)",
                      border: "1px solid #e5e7eb",
                      zIndex: 20,
                      color: "#777b84",
                    }}
                  >
                    City not found
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("Jaipur");
                  setShowLocationMenu(false);
                }}
                style={{
                  height: "62px",
                  padding: "0 22px",
                  border: "1px solid #b9bdc6",
                  borderRadius: "9px",
                  background: "#fff",
                  color: "#0878e8",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                ◎ Detect my location
              </button>
            </div>

            <div
              style={{
                borderBottom: "1px solid #e1e3e7",
                paddingBottom: "18px",
                marginBottom: "18px",
                color: "#666b74",
                fontSize: "16px",
              }}
            >
              <span style={{ color: "#0878e8", marginRight: "8px" }}>⌖</span>
              Last visited location{" "}
              <button
                type="button"
                onClick={() => continueWithLocation("Jaipur")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#0878e8",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Continue with Jaipur
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "12px",
              }}
            >
              {locations.map((location) => (
                <button
                  key={location.name}
                  type="button"
                  onClick={() => continueWithLocation(location.name)}
                  style={{
                    border:
                      selectedLocation === location.name
                        ? "2px solid #ff3b3b"
                        : "1px solid #e4e6ea",
                    borderRadius: "9px",
                    background: "#fff",
                    overflow: "hidden",
                    padding: 0,
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    style={{
                      width: "100%",
                      height: "82px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      padding: "8px 4px",
                      color: "#454952",
                      fontSize: "14px",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {location.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/mahindra-thar", {
                    state: {
                      car: {
                        id: "mahindra-thar",
                        name: "Mahindra Thar",
                        brand: "Mahindra",
                        model: "Thar",
                        year: "2022",
                        price: "₹13.75 Lakh",
                        priceValue: 13.75,
                        km: "27,000",
                        fuel: "Diesel",
                        transmission: "Manual",
                        category: "SUV",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/hyundai-creta", {
                    state: {
                      car: {
                        id: "hyundai-creta",
                        name: "Hyundai Creta",
                        brand: "Hyundai",
                        model: "Creta",
                        year: "2021",
                        price: "₹11.20 Lakh",
                        priceValue: 11.20,
                        km: "35,000",
                        fuel: "Petrol",
                        transmission: "Manual",
                        category: "SUV",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/tata-nexon", {
                    state: {
                      car: {
                        id: "tata-nexon",
                        name: "Tata Nexon",
                        brand: "Tata",
                        model: "Nexon",
                        year: "2023",
                        price: "₹8.90 Lakh",
                        priceValue: 8.90,
                        km: "18,000",
                        fuel: "Petrol",
                        transmission: "Automatic",
                        category: "SUV",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/bmw-3-series", {
                    state: {
                      car: {
                        id: "bmw-3-series",
                        name: "BMW 3 Series",
                        brand: "BMW",
                        model: "3 Series",
                        year: "2022",
                        price: "₹42.50 Lakh",
                        priceValue: 42.50,
                        km: "19,000",
                        fuel: "Petrol",
                        transmission: "Automatic",
                        category: "Sedan",
                        location: "Delhi",
                        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/mercedes-benz-a-class", {
                    state: {
                      car: {
                        id: "mercedes-benz-a-class",
                        name: "Mercedes-Benz A-Class",
                        brand: "Mercedes-Benz",
                        model: "A-Class",
                        year: "2021",
                        price: "₹35.90 Lakh",
                        priceValue: 35.90,
                        km: "24,000",
                        fuel: "Petrol",
                        transmission: "Automatic",
                        category: "Hatchback",
                        location: "Gurgaon",
                        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/toyota-fortuner", {
                    state: {
                      car: {
                        id: "toyota-fortuner",
                        name: "Toyota Fortuner",
                        brand: "Toyota",
                        model: "Fortuner",
                        year: "2023",
                        price: "₹38.75 Lakh",
                        priceValue: 38.75,
                        km: "16,000",
                        fuel: "Diesel",
                        transmission: "Automatic",
                        category: "SUV",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/honda-city", {
                    state: {
                      car: {
                        id: "honda-city",
                        name: "Honda City",
                        brand: "Honda",
                        model: "City",
                        year: "2022",
                        price: "₹14.20 Lakh",
                        priceValue: 14.20,
                        km: "32,000",
                        fuel: "Petrol",
                        transmission: "Manual",
                        category: "Sedan",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/volkswagen-virtus", {
                    state: {
                      car: {
                        id: "volkswagen-virtus",
                        name: "Volkswagen Virtus",
                        brand: "Volkswagen",
                        model: "Virtus",
                        year: "2023",
                        price: "₹16.90 Lakh",
                        priceValue: 16.90,
                        km: "18,000",
                        fuel: "Petrol",
                        transmission: "Automatic",
                        category: "Sedan",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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

              <button
                className="details-btn"
                onClick={() =>
                  navigate("/cars/kia-sonet", {
                    state: {
                      car: {
                        id: "kia-sonet",
                        name: "Kia Sonet",
                        brand: "Kia",
                        model: "Sonet",
                        year: "2022",
                        price: "₹7.50 Lakh",
                        priceValue: 7.50,
                        km: "70,000",
                        fuel: "Diesel",
                        transmission: "Manual",
                        category: "SUV",
                        location: "Jaipur",
                        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
                        tag: "CarMarket Verified",
                        priceTag: "FEATURED CAR",
                        description: "Verified used car listing from CarMarket.",
                        status: "Available",
                      },
                    },
                  })
                }
              >
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