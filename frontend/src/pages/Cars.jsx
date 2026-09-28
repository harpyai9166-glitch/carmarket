import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cars.css";

function Cars() {
  const navigate = useNavigate();

  // =========================
  // FILTER STATES
  // =========================

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [fuelFilter, setFuelFilter] = useState("All Fuel Types");
  const [transmissionFilter, setTransmissionFilter] =
    useState("Any Transmission");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [categoryFilter, setCategoryFilter] = useState("All Cars");
  const [sortOption, setSortOption] = useState("Sort: Recommended");

  const [favorites, setFavorites] = useState([]);

  // =========================
  // DEFAULT / STATIC CARS
  // =========================

  const defaultCars = [
    {
      id: 1,
      name: "Kia Sonet",
      brand: "Kia",
      category: "SUV",
      price: "₹7.50 Lakh",
      priceValue: 7.5,
      year: "2022",
      yearValue: 2022,
      km: "70,000",
      fuel: "Diesel",
      transmission: "Manual",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
      tag: "Direct Owner",
      priceTag: "BELOW MARKET",
    },
    {
      id: 2,
      name: "Skoda Slavia",
      brand: "Skoda",
      category: "Sedan",
      price: "₹10.39 Lakh",
      priceValue: 10.39,
      year: "2022",
      yearValue: 2022,
      km: "45,432",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=80",
      tag: "Spinny",
      priceTag: "GREAT PRICE",
    },
    {
      id: 3,
      name: "Kia Syros",
      brand: "Kia",
      category: "SUV",
      price: "₹11.75 Lakh",
      priceValue: 11.75,
      year: "2025",
      yearValue: 2025,
      km: "16,186",
      fuel: "Diesel",
      transmission: "Manual",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
      tag: "Partner",
      priceTag: "FAIR PRICE",
    },
    {
      id: 4,
      name: "BMW 3 Series",
      brand: "BMW",
      category: "Luxury",
      price: "₹42.50 Lakh",
      priceValue: 42.5,
      year: "2022",
      yearValue: 2022,
      km: "19,000",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
      tag: "Verified",
      priceTag: "GREAT PRICE",
    },
    {
      id: 5,
      name: "Mercedes-Benz A-Class",
      brand: "Mercedes-Benz",
      category: "Luxury",
      price: "₹35.90 Lakh",
      priceValue: 35.9,
      year: "2021",
      yearValue: 2021,
      km: "24,000",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "Gurgaon",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      tag: "Premium",
      priceTag: "FAIR PRICE",
    },
    {
      id: 6,
      name: "Toyota Fortuner",
      brand: "Toyota",
      category: "SUV",
      price: "₹38.75 Lakh",
      priceValue: 38.75,
      year: "2023",
      yearValue: 2023,
      km: "16,000",
      fuel: "Diesel",
      transmission: "Automatic",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
      tag: "Dealer",
      priceTag: "BELOW MARKET",
    },
    {
      id: 7,
      name: "Hyundai Creta",
      brand: "Hyundai",
      category: "SUV",
      price: "₹11.20 Lakh",
      priceValue: 11.2,
      year: "2021",
      yearValue: 2021,
      km: "35,000",
      fuel: "Petrol",
      transmission: "Manual",
      location: "Alwar",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
      tag: "Verified",
      priceTag: "GREAT PRICE",
    },
    {
      id: 8,
      name: "Mahindra Thar",
      brand: "Mahindra",
      category: "SUV",
      price: "₹13.75 Lakh",
      priceValue: 13.75,
      year: "2022",
      yearValue: 2022,
      km: "27,000",
      fuel: "Diesel",
      transmission: "Manual",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
      tag: "Direct Owner",
      priceTag: "FAIR PRICE",
    },
    {
      id: 9,
      name: "Tata Nexon",
      brand: "Tata",
      category: "SUV",
      price: "₹8.90 Lakh",
      priceValue: 8.9,
      year: "2023",
      yearValue: 2023,
      km: "18,000",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80",
      tag: "Partner",
      priceTag: "GREAT PRICE",
    },
        // =========================
    // HATCHBACK CARS
    // =========================

    {
      id: 12,
      name: "Maruti Swift",
      brand: "Maruti",
      category: "Hatchback",
      price: "₹6.75 Lakh",
      priceValue: 6.75,
      year: "2023",
      yearValue: 2023,
      km: "22,000",
      fuel: "Petrol",
      transmission: "Manual",
      location: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
      tag: "Verified",
      priceTag: "GREAT PRICE",
    },

    {
      id: 13,
      name: "Hyundai i20",
      brand: "Hyundai",
      category: "Hatchback",
      price: "₹8.25 Lakh",
      priceValue: 8.25,
      year: "2022",
      yearValue: 2022,
      km: "28,000",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "Alwar",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80",
      tag: "Partner",
      priceTag: "FAIR PRICE",
    },
    {
      id: 10,
      name: "Tata Nexon EV",
      brand: "Tata",
      category: "Electric",
      price: "₹14.25 Lakh",
      priceValue: 14.25,
      year: "2023",
      yearValue: 2023,
      km: "17,000",
      fuel: "Electric",
      transmission: "Automatic",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
      tag: "Verified",
      priceTag: "GREAT PRICE",
    },
    {
      id: 11,
      name: "MG ZS EV",
      brand: "MG",
      category: "Electric",
      price: "₹18.50 Lakh",
      priceValue: 18.5,
      year: "2022",
      yearValue: 2022,
      km: "24,000",
      fuel: "Electric",
      transmission: "Automatic",
      location: "Gurgaon",
      image:
        "https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?auto=format&fit=crop&w=900&q=80",
      tag: "Premium",
      priceTag: "FAIR PRICE",
    },
  ];

  // =========================
  // MONGODB INVENTORY
  // =========================

  const [apiCars, setApiCars] = useState([]);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setCarLoading(true);
        setCarError("");

        const response = await fetch("https://carmarket-backend-966q.onrender.com/api/cars");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch cars");
        }

        const inventoryCars = (result.data || [])
          .filter((car) => car.status !== "Sold")
          .map((car) => {
            const priceValue = Number(car.price || 0) / 100000;
            const yearValue = Number(car.year || 0);
            const kmValue = Number(car.kmDriven || 0);

            return {
              id: car._id,
              name: car.name || "Car",
              brand: car.brand || "",
              model: car.model || "",
              category: car.bodyType || "SUV",
              price: `₹${priceValue.toFixed(2)} Lakh`,
              priceValue,
              year: String(car.year || ""),
              yearValue,
              km: kmValue.toLocaleString("en-IN"),
              fuel: car.fuel || "",
              transmission: car.transmission || "",
              location: car.city || "",
              image:
                car.image ||
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
              tag: "CarMarket Verified",
              priceTag: "NEW LISTING",
              description: car.description || "",
              status: car.status || "Available",
            };
          });

        setApiCars(inventoryCars);
      } catch (error) {
        console.error("Fetch Cars Error:", error);
        setCarError("Unable to load latest cars from marketplace.");
        setApiCars([]);
      } finally {
        setCarLoading(false);
      }
    };

    fetchCars();
  }, []);

  // =========================
  // MERGE INVENTORY
  // =========================
  // IMPORTANT:
  // MongoDB cars get priority.
  // If MongoDB contains "BMW 3 Series", the old static
  // BMW 3 Series is removed and MongoDB BMW is shown instead.
  // New MongoDB cars are also added automatically.

  const cars = useMemo(() => {
    const inventoryNames = new Set(
      apiCars.map((car) => car.name.trim().toLowerCase())
    );

    const remainingDefaultCars = defaultCars.filter(
      (defaultCar) =>
        !inventoryNames.has(defaultCar.name.trim().toLowerCase())
    );

    return [...apiCars, ...remainingDefaultCars];
  }, [apiCars]);

  // =========================
  // FAVORITE
  // =========================

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const search = searchTerm.trim().toLowerCase();

      const searchMatch =
        search === "" ||
        car.name.toLowerCase().includes(search) ||
        car.brand.toLowerCase().includes(search) ||
        car.location.toLowerCase().includes(search) ||
        car.fuel.toLowerCase().includes(search) ||
        car.transmission.toLowerCase().includes(search);

      const locationMatch =
        locationFilter === "All Locations" ||
        car.location === locationFilter;

      const brandMatch =
        brandFilter === "All Brands" ||
        car.brand === brandFilter;

      const fuelMatch =
        fuelFilter === "All Fuel Types" ||
        car.fuel === fuelFilter;

      const transmissionMatch =
        transmissionFilter === "Any Transmission" ||
        car.transmission === transmissionFilter;

      const categoryMatch =
        categoryFilter === "All Cars" ||
        car.category === categoryFilter;

      let priceMatch = true;

      if (priceFilter === "Under ₹5 Lakh") {
        priceMatch = car.priceValue < 5;
      }

      if (priceFilter === "₹5 - ₹10 Lakh") {
        priceMatch = car.priceValue >= 5 && car.priceValue <= 10;
      }

      if (priceFilter === "₹10 - ₹20 Lakh") {
        priceMatch = car.priceValue > 10 && car.priceValue <= 20;
      }

      if (priceFilter === "₹20 - ₹40 Lakh") {
        priceMatch = car.priceValue > 20 && car.priceValue <= 40;
      }

      if (priceFilter === "Above ₹40 Lakh") {
        priceMatch = car.priceValue > 40;
      }

      return (
        searchMatch &&
        locationMatch &&
        brandMatch &&
        fuelMatch &&
        transmissionMatch &&
        categoryMatch &&
        priceMatch
      );
    });

    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    }

    if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    }

    if (sortOption === "Newest First") {
      result.sort((a, b) => b.yearValue - a.yearValue);
    }

    return result;
  }, [
    cars,
    searchTerm,
    locationFilter,
    brandFilter,
    fuelFilter,
    transmissionFilter,
    priceFilter,
    categoryFilter,
    sortOption,
  ]);

  // =========================
  // RESET ALL
  // =========================

  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("All Locations");
    setBrandFilter("All Brands");
    setFuelFilter("All Fuel Types");
    setTransmissionFilter("Any Transmission");
    setPriceFilter("Any Price");
    setCategoryFilter("All Cars");
    setSortOption("Sort: Recommended");
  };

  // =========================
  // VIEW CAR DETAILS
  // =========================

  const viewCarDetails = (car) => {
    navigate(`/cars/${car.id}`, {
      state: { car },
    });
  };

  return (
    <div className="cars-page">
      {/* HEADER */}
      <div className="cars-header">
        <div>
          <p className="cars-small-title">EXPLORE OUR COLLECTION</p>

          <h1>
            Buy a <span>car</span>
          </h1>

          <p className="cars-subtitle">
            Find your perfect used car from our verified collection.
          </p>
        </div>

        <div className="car-count">
          <strong>{filteredCars.length}</strong>
          <span>Cars Available</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="cars-search">
        <div className="search-input-wrapper">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search car, brand or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ×
            </button>
          )}
        </div>

        <button
          className="search-button"
          onClick={() =>
            window.scrollTo({
              top: 250,
              behavior: "smooth",
            })
          }
        >
          Search
        </button>
      </div>

      {/* CATEGORY */}
      <div className="car-categories">
        <button
          className={`category ${
            categoryFilter === "All Cars" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("All Cars")}
        >
          🚘 All Cars
        </button>

        <button
          className={`category ${
            categoryFilter === "SUV" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("SUV")}
        >
          🚙 SUV
        </button>

        <button
          className={`category ${
            categoryFilter === "Sedan" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("Sedan")}
        >
          🚗 Sedan
        </button>

        <button
          className={`category ${
            categoryFilter === "Hatchback" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("Hatchback")}
        >
          🚐 Hatchback
        </button>

        <button
          className={`category ${
            categoryFilter === "Electric" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("Electric")}
        >
          ⚡ Electric
        </button>

        <button
          className={`category ${
            categoryFilter === "Luxury" ? "active" : ""
          }`}
          onClick={() => setCategoryFilter("Luxury")}
        >
          🏎️ Luxury
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="cars-content">
        {/* FILTER SIDEBAR */}
        <aside className="filter-sidebar">
          <div className="filter-heading">
            <h3>Filters</h3>

            <button onClick={resetFilters}>Reset</button>
          </div>

          <div className="filter-box">
            <label>Location</label>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option>All Locations</option>

              {[...new Set(cars.map((car) => car.location))]
                .filter(Boolean)
                .sort()
                .map((location) => (
                  <option key={location}>{location}</option>
                ))}
            </select>
          </div>

          <div className="filter-box">
            <label>Brand</label>

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option>All Brands</option>

              {[...new Set(cars.map((car) => car.brand))]
                .filter(Boolean)
                .sort()
                .map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
            </select>
          </div>

          <div className="filter-box">
            <label>Fuel Type</label>

            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
            >
              <option>All Fuel Types</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div className="filter-box">
            <label>Transmission</label>

            <select
              value={transmissionFilter}
              onChange={(e) =>
                setTransmissionFilter(e.target.value)
              }
            >
              <option>Any Transmission</option>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>

          <div className="filter-box">
            <label>Price Range</label>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option>Any Price</option>
              <option>Under ₹5 Lakh</option>
              <option>₹5 - ₹10 Lakh</option>
              <option>₹10 - ₹20 Lakh</option>
              <option>₹20 - ₹40 Lakh</option>
              <option>Above ₹40 Lakh</option>
            </select>
          </div>

          <button
            className="apply-filter"
            onClick={() =>
              window.scrollTo({
                top: 250,
                behavior: "smooth",
              })
            }
          >
            Apply Filters
          </button>
        </aside>

        {/* CAR LIST */}
        <main className="cars-list">
          <div className="list-top">
            <div>
              <h2>Cars for Sale</h2>

              <p>
                {filteredCars.length} verified cars found
                {carLoading && " • Loading latest listings..."}
              </p>

              {carError && (
                <small style={{ color: "#b45309" }}>
                  {carError}
                </small>
              )}
            </div>

            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Sort: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* CAR GRID */}
          <div className="cars-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  className="used-car-card"
                  key={car.id}
                >
                  {/* IMAGE */}
                  <div className="used-car-image">
                    <img
                      src={car.image}
                      alt={car.name}
                    />

                    <div className="car-tag">
                      {car.tag}
                    </div>

                    <button
                      className="save-car"
                      onClick={() =>
                        toggleFavorite(car.id)
                      }
                    >
                      {favorites.includes(car.id)
                        ? "♥"
                        : "♡"}
                    </button>
                  </div>

                  {/* BODY */}
                  <div className="used-car-body">
                    <div className="car-title-row">
                      <h3>{car.name}</h3>

                      <strong>{car.price}</strong>
                    </div>

                    <div className="car-year">
                      {car.year}
                    </div>

                    <div className="car-specs">
                      <span>
                        🛣️ {car.km} km
                      </span>

                      <span>
                        ⚙️ {car.transmission}
                      </span>

                      <span>
                        ⛽ {car.fuel}
                      </span>
                    </div>

                    <p className="car-location">
                      📍 {car.location}
                    </p>

                    {/* AI EXPERT */}
                    <div className="ai-expert">
                      <div className="ai-header">
                        <strong>
                          👨‍💼 AI Expert
                        </strong>

                        <span>
                          {car.priceTag}
                        </span>
                      </div>

                      <p>
                        ✓ 1st owner, no accident,{" "}
                        {car.km} km — documents look
                        clean on this car.
                      </p>

                      <p>
                        ✓ Price checked against similar
                        cars in the market.
                      </p>

                      <button>
                        Read full report ↗
                      </button>
                    </div>

                    {/* ACTIONS */}
                    <div className="card-actions">
                      <button className="chat-btn">
                        💬 Chat
                      </button>

                      <button
                        className="seller-btn"
                        onClick={() =>
                          viewCarDetails(car)
                        }
                      >
                        View Seller Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-cars">
                <h3>No cars found</h3>

                <p>
                  Try changing your search or filters.
                </p>

                <button onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Cars;
