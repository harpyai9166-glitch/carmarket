import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // ADMIN LOGIN PROTECTION
  // =====================================================

  useEffect(() => {
    const isAdminLoggedIn =
      localStorage.getItem("isAdminLoggedIn");

    if (isAdminLoggedIn !== "true") {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  // =====================================================
  // PURCHASE REQUEST STATES
  // =====================================================

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Purchase status update loading
  const [updatingId, setUpdatingId] = useState(null);

  // Purchase delete loading
  const [deletingId, setDeletingId] = useState(null);

  // Purchase selected request
  const [selectedRequest, setSelectedRequest] = useState(null);

  // =====================================================
  // SELL CAR REQUEST STATES
  // =====================================================

  const [sellRequests, setSellRequests] = useState([]);
  const [sellLoading, setSellLoading] = useState(true);
  const [sellError, setSellError] = useState("");

  const [sellSearchTerm, setSellSearchTerm] = useState("");
  const [sellStatusFilter, setSellStatusFilter] = useState("All");

  // Sell status update loading
  const [sellUpdatingId, setSellUpdatingId] = useState(null);

  // Sell delete loading
  const [sellDeletingId, setSellDeletingId] = useState(null);

  // Sell selected request
  const [selectedSellRequest, setSelectedSellRequest] = useState(null);

  // =====================================================
  // CAR INVENTORY STATES
  // =====================================================

  const [cars, setCars] = useState([]);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState("");
  const [showAddCar, setShowAddCar] = useState(false);
  const [addingCar, setAddingCar] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [deletingCarId, setDeletingCarId] = useState(null);
  const [updatingCarStatusId, setUpdatingCarStatusId] = useState(null);

  const [carForm, setCarForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    kmDriven: "",
    fuel: "Petrol",
    transmission: "Manual",
    bodyType: "SUV",
    city: "Jaipur",
    image: "",
    description: "",
    status: "Available",
  });

  // =====================================================
  // FETCH PURCHASE REQUESTS
  // =====================================================

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/purchase-requests"
      );

      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Fetch Requests Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load purchase requests."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH SELL CAR REQUESTS
  // =====================================================

  const fetchSellRequests = async () => {
    try {
      setSellLoading(true);
      setSellError("");

      const response = await axios.get(
        "http://localhost:5000/api/sell-cars"
      );

      setSellRequests(response.data.data || []);
    } catch (error) {
      console.error("Fetch Sell Car Requests Error:", error);

      setSellError(
        error.response?.data?.message ||
          "Unable to load sell car requests."
      );
    } finally {
      setSellLoading(false);
    }
  };

  // =====================================================
  // FETCH CAR INVENTORY
  // =====================================================

  const fetchCars = async () => {
    try {
      setCarLoading(true);
      setCarError("");

      const response = await axios.get(
        "http://localhost:5000/api/cars"
      );

      setCars(response.data.data || []);
    } catch (error) {
      console.error("Fetch Cars Error:", error);

      setCarError(
        error.response?.data?.message ||
          "Unable to load car inventory."
      );
    } finally {
      setCarLoading(false);
    }
  };

  // =====================================================
  // ADD NEW CAR
  // =====================================================

  const handleCarFormChange = (e) => {
    const { name, value } = e.target;

    setCarForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetCarForm = () => {
    setCarForm({
      name: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      kmDriven: "",
      fuel: "Petrol",
      transmission: "Manual",
      bodyType: "SUV",
      city: "Jaipur",
      image: "",
      description: "",
      status: "Available",
    });
  };

  const openAddCarModal = () => {
    setEditingCarId(null);
    resetCarForm();
    setShowAddCar(true);
  };

  const handleEditCar = (car) => {
    setEditingCarId(car._id);

    setCarForm({
      name: car.name || "",
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || "",
      price: car.price || "",
      kmDriven: car.kmDriven || "",
      fuel: car.fuel || "Petrol",
      transmission: car.transmission || "Manual",
      bodyType: car.bodyType || "SUV",
      city: car.city || "Jaipur",
      image: car.image || "",
      description: car.description || "",
      status: car.status || "Available",
    });

    setShowAddCar(true);
  };

  const closeCarModal = () => {
    if (addingCar) return;

    setShowAddCar(false);
    setEditingCarId(null);
    resetCarForm();
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();

    try {
      setAddingCar(true);

      const payload = {
        ...carForm,
        year: Number(carForm.year),
        price: Number(carForm.price),
        kmDriven: Number(carForm.kmDriven),
      };

      const response = editingCarId
        ? await axios.put(
            `http://localhost:5000/api/cars/${editingCarId}`,
            payload
          )
        : await axios.post(
            "http://localhost:5000/api/cars",
            payload
          );

      if (response.data.success) {
        if (editingCarId) {
          setCars((current) =>
            current.map((car) =>
              car._id === editingCarId
                ? response.data.data
                : car
            )
          );

          alert("Car updated successfully!");
        } else {
          setCars((current) => [
            response.data.data,
            ...current,
          ]);

          alert("Car added successfully!");
        }

        // Close the modal after a successful add/update.
        // Do not call closeCarModal() here because the submit button
        // is still in the loading state at this moment.
        setShowAddCar(false);
        setEditingCarId(null);
        resetCarForm();
      }
    } catch (error) {
      console.error(
        editingCarId ? "Update Car Error:" : "Add Car Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          (editingCarId
            ? "Unable to update car. Please check all fields."
            : "Unable to add car. Please check all fields.")
      );
    } finally {
      setAddingCar(false);
    }
  };

  // =====================================================
  // DELETE CAR
  // =====================================================

  const handleDeleteCar = async (car) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${car.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingCarId(car._id);

      const response = await axios.delete(
        `http://localhost:5000/api/cars/${car._id}`
      );

      if (response.data.success) {
        setCars((current) =>
          current.filter((item) => item._id !== car._id)
        );

        alert("Car deleted successfully!");
      }
    } catch (error) {
      console.error("Delete Car Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete car. Please try again."
      );
    } finally {
      setDeletingCarId(null);
    }
  };

  // =====================================================
  // UPDATE CAR STATUS
  // =====================================================

  const handleCarStatusChange = async (car, newStatus) => {
    if (car.status === newStatus) return;

    try {
      setUpdatingCarStatusId(car._id);

      const response = await axios.patch(
        `http://localhost:5000/api/cars/${car._id}/status`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        setCars((current) =>
          current.map((item) =>
            item._id === car._id
              ? response.data.data
              : item
          )
        );

        alert(`Car status changed to ${newStatus}!`);
      }
    } catch (error) {
      console.error("Update Car Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update car status. Please try again."
      );
    } finally {
      setUpdatingCarStatusId(null);
    }
  };

  // =====================================================
  // FIRST LOAD
  // =====================================================

  useEffect(() => {
    fetchRequests();
    fetchSellRequests();
    fetchCars();
  }, []);

  // =====================================================
  // REFRESH BOTH REQUESTS
  // =====================================================

  const handleRefreshAll = () => {
    fetchRequests();
    fetchSellRequests();
    fetchCars();
  };

  // =====================================================
  // UPDATE PURCHASE STATUS
  // =====================================================

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      setUpdatingId(requestId);

      const response = await axios.patch(
        `http://localhost:5000/api/purchase-requests/${requestId}/status`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        setRequests((currentRequests) =>
          currentRequests.map((request) =>
            request._id === requestId
              ? {
                  ...request,
                  status: newStatus,
                }
              : request
          )
        );

        setSelectedRequest((currentRequest) =>
          currentRequest?._id === requestId
            ? {
                ...currentRequest,
                status: newStatus,
              }
            : currentRequest
        );
      }
    } catch (error) {
      console.error("Status Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update request status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // DELETE PURCHASE REQUEST
  // =====================================================

  const handleDeleteRequest = async (requestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this purchase request? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(requestId);

      const response = await axios.delete(
        `http://localhost:5000/api/purchase-requests/${requestId}`
      );

      if (response.data.success) {
        setRequests((currentRequests) =>
          currentRequests.filter(
            (request) => request._id !== requestId
          )
        );

        if (selectedRequest?._id === requestId) {
          setSelectedRequest(null);
        }
      }
    } catch (error) {
      console.error("Delete Request Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete purchase request."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // UPDATE SELL CAR STATUS
  // =====================================================

  const handleSellStatusChange = async (
    requestId,
    newStatus
  ) => {
    try {
      setSellUpdatingId(requestId);

      const response = await axios.patch(
        `http://localhost:5000/api/sell-cars/${requestId}/status`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        setSellRequests((currentRequests) =>
          currentRequests.map((request) =>
            request._id === requestId
              ? {
                  ...request,
                  status: newStatus,
                }
              : request
          )
        );

        setSelectedSellRequest((currentRequest) =>
          currentRequest?._id === requestId
            ? {
                ...currentRequest,
                status: newStatus,
              }
            : currentRequest
        );
      }
    } catch (error) {
      console.error(
        "Sell Car Status Update Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update sell car request status."
      );
    } finally {
      setSellUpdatingId(null);
    }
  };

  // =====================================================
  // DELETE SELL CAR REQUEST
  // =====================================================

  const handleDeleteSellRequest = async (requestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sell car request? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setSellDeletingId(requestId);

      const response = await axios.delete(
        `http://localhost:5000/api/sell-cars/${requestId}`
      );

      if (response.data.success) {
        setSellRequests((currentRequests) =>
          currentRequests.filter(
            (request) => request._id !== requestId
          )
        );

        if (
          selectedSellRequest?._id === requestId
        ) {
          setSelectedSellRequest(null);
        }
      }
    } catch (error) {
      console.error(
        "Delete Sell Car Request Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to delete sell car request."
      );
    } finally {
      setSellDeletingId(null);
    }
  };

  // =====================================================
  // OPEN / CLOSE PURCHASE DETAILS
  // =====================================================

  const openDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
  };

  // =====================================================
  // OPEN / CLOSE SELL DETAILS
  // =====================================================

  const openSellDetails = (request) => {
    setSelectedSellRequest(request);
  };

  const closeSellDetails = () => {
    setSelectedSellRequest(null);
  };

  // =====================================================
  // FILTER PURCHASE REQUESTS
  // =====================================================

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        request.customerName
          ?.toLowerCase()
          .includes(search) ||
        request.carName
          ?.toLowerCase()
          .includes(search) ||
        request.email
          ?.toLowerCase()
          .includes(search) ||
        request.mobile
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  // =====================================================
  // FILTER SELL CAR REQUESTS
  // =====================================================

  const filteredSellRequests = useMemo(() => {
    return sellRequests.filter((request) => {
      const search = sellSearchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        request.name
          ?.toLowerCase()
          .includes(search) ||
        request.brand
          ?.toLowerCase()
          .includes(search) ||
        request.model
          ?.toLowerCase()
          .includes(search) ||
        request.email
          ?.toLowerCase()
          .includes(search) ||
        request.mobile
          ?.toLowerCase()
          .includes(search) ||
        request.city
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        sellStatusFilter === "All" ||
        request.status === sellStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    sellRequests,
    sellSearchTerm,
    sellStatusFilter,
  ]);

  // =====================================================
  // SAFE DATE FORMAT
  // =====================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      case "Contacted":
        return "status-contacted";

      default:
        return "status-pending";
    }
  };

  // =====================================================
  // PURCHASE STATISTICS
  // =====================================================

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const contactedRequests = requests.filter(
    (request) => request.status === "Contacted"
  ).length;

  // =====================================================
  // SELL CAR STATISTICS
  // =====================================================

  const totalSellRequests = sellRequests.length;

  const pendingSellRequests = sellRequests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedSellRequests = sellRequests.filter(
    (request) => request.status === "Approved"
  ).length;

  const contactedSellRequests = sellRequests.filter(
    (request) => request.status === "Contacted"
  ).length;

  // =====================================================
  // ADMIN LOGOUT
  // =====================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login", { replace: true });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-dashboard">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="admin-header">

        <div>

          <p className="admin-small-title">
            ADMIN PANEL
          </p>

          <h1>
            Car Marketplace Admin
          </h1>

          <p className="admin-subtitle">
            Manage purchase requests and cars submitted
            by customers.
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setShowAddCar(true)}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "11px 18px",
              background: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            + Add New Car
          </button>

          <button
            className="refresh-btn"
            onClick={handleRefreshAll}
            disabled={loading || sellLoading || carLoading}
          >
            {loading || sellLoading
              ? "↻ Loading..."
              : "↻ Refresh"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "11px 18px",
              background: "#111827",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            Logout
          </button>
        </div>

      </header>

      {/* ======================================
          CAR INVENTORY
      ====================================== */}

      <section
        className="requests-section"
        style={{ marginBottom: "30px" }}
      >
        <div className="requests-toolbar">
          <div>
            <p
              className="admin-small-title"
              style={{ marginBottom: "5px" }}
            >
              CAR INVENTORY
            </p>

            <h2>Cars for Sale</h2>

            <p>
              {cars.length} car{cars.length !== 1 ? "s" : ""} in
              inventory
            </p>
          </div>
        </div>

        {carLoading && (
          <div className="admin-loading">
            <div className="loading-spinner"></div>
            <p>Loading car inventory...</p>
          </div>
        )}

        {!carLoading && carError && (
          <div className="admin-error">
            <div className="error-icon">!</div>
            <h3>Unable to load car inventory</h3>
            <p>{carError}</p>
            <button onClick={fetchCars}>Try Again</button>
          </div>
        )}

        {!carLoading && !carError && cars.length === 0 && (
          <div className="admin-empty">
            <div className="empty-icon">🚗</div>
            <h3>No cars in inventory</h3>
            <p>
              Click “+ Add New Car” above to add your first car.
            </p>
          </div>
        )}

        {!carLoading && !carError && cars.length > 0 && (
          <div className="requests-table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>CAR</th>
                  <th>YEAR</th>
                  <th>PRICE</th>
                  <th>KM</th>
                  <th>FUEL</th>
                  <th>TRANSMISSION</th>
                  <th>CITY</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <div className="car-cell">
                        <strong>{car.name}</strong>
                        <small>
                          {car.brand} {car.model}
                        </small>
                      </div>
                    </td>

                    <td>{car.year || "—"}</td>

                    <td>
                      <strong className="car-price">
                        ₹
                        {Number(car.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </td>

                    <td>
                      {Number(car.kmDriven || 0).toLocaleString(
                        "en-IN"
                      )}{" "}
                      KM
                    </td>

                    <td>{car.fuel || "—"}</td>

                    <td>{car.transmission || "—"}</td>

                    <td>
                      <span className="date-value">
                        📍 {car.city || "—"}
                      </span>
                    </td>

                    <td>
                      <select
                        value={car.status || "Available"}
                        disabled={updatingCarStatusId === car._id}
                        onChange={(e) =>
                          handleCarStatusChange(car, e.target.value)
                        }
                        style={{
                          border: "1px solid #dbe2ea",
                          borderRadius: "999px",
                          padding: "7px 28px 7px 10px",
                          background:
                            car.status === "Sold"
                              ? "#fff1f2"
                              : "#ecfdf3",
                          color:
                            car.status === "Sold"
                              ? "#d93030"
                              : "#15803d",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor:
                            updatingCarStatusId === car._id
                              ? "not-allowed"
                              : "pointer",
                          outline: "none",
                          opacity:
                            updatingCarStatusId === car._id ? 0.6 : 1,
                        }}
                      >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleEditCar(car)}
                          disabled={deletingCarId === car._id}
                          style={{
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            cursor: deletingCarId === car._id ? "not-allowed" : "pointer",
                            fontWeight: 800,
                            fontSize: "12px",
                            opacity: deletingCarId === car._id ? 0.6 : 1,
                          }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCar(car)}
                          disabled={deletingCarId === car._id}
                          style={{
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            background: "#fff1f2",
                            color: "#dc2626",
                            cursor: deletingCarId === car._id ? "not-allowed" : "pointer",
                            fontWeight: 800,
                            fontSize: "12px",
                            opacity: deletingCarId === car._id ? 0.6 : 1,
                          }}
                        >
                          {deletingCarId === car._id ? "Deleting..." : "🗑️ Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ======================================
          ADD NEW CAR MODAL
      ====================================== */}

      {showAddCar && (
        <div
          className="request-modal-overlay"
          onClick={closeCarModal}
        >
          <div
            className="request-modal"
            style={{ maxWidth: "850px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="request-modal-header">
              <div>
                <span className="modal-small-title">
                  CAR INVENTORY
                </span>

                <h2>{editingCarId ? "Edit Car" : "Add New Car"}</h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6b7280",
                  }}
                >
                  {editingCarId
                    ? "Update the car details in your marketplace."
                    : "Add a car that will be available in your marketplace."}
                </p>
              </div>

              <button
                className="modal-close-btn"
                onClick={closeCarModal}
                disabled={addingCar}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCarSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "20px",
                }}
              >
                {[
                  ["name", "Car Name", "e.g. BMW 3 Series"],
                  ["brand", "Brand", "e.g. BMW"],
                  ["model", "Model", "e.g. 320d"],
                  ["year", "Year", "e.g. 2022"],
                  ["price", "Price", "e.g. 2850000"],
                  ["kmDriven", "KM Driven", "e.g. 35000"],
                  ["city", "City", "e.g. Jaipur"],
                  ["image", "Image URL", "https://..."],
                ].map(([name, label, placeholder]) => (
                  <div key={name}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "7px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#374151",
                      }}
                    >
                      {label}
                      {name !== "image" && " *"}
                    </label>

                    <input
                      type={
                        ["year", "price", "kmDriven"].includes(
                          name
                        )
                          ? "number"
                          : "text"
                      }
                      name={name}
                      value={carForm[name]}
                      onChange={handleCarFormChange}
                      placeholder={placeholder}
                      required={name !== "image"}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "11px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "9px",
                        outline: "none",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Fuel *
                  </label>

                  <select
                    name="fuel"
                    value={carForm.fuel}
                    onChange={handleCarFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>CNG</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Transmission *
                  </label>

                  <select
                    name="transmission"
                    value={carForm.transmission}
                    onChange={handleCarFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option>Manual</option>
                    <option>Automatic</option>
                    <option>AMT</option>
                    <option>CVT</option>
                    <option>DCT</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Body Type *
                  </label>

                  <select
                    name="bodyType"
                    value={carForm.bodyType}
                    onChange={handleCarFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                    <option>Luxury</option>
                    <option>Electric</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Status *
                  </label>

                  <select
                    name="status"
                    value={carForm.status}
                    onChange={handleCarFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "9px",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option>Available</option>
                    <option>Sold</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  Description
                </label>

                <textarea
                  name="description"
                  value={carForm.description}
                  onChange={handleCarFormChange}
                  placeholder="Write a short description about the car..."
                  rows="4"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "9px",
                    resize: "vertical",
                    fontSize: "14px",
                  }}
                ></textarea>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid #eee",
                }}
              >
                <button
                  type="button"
                  className="modal-close-bottom"
                  onClick={closeCarModal}
                  disabled={addingCar}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    background: "#2563eb",
                    color: "#fff",
                    cursor: addingCar
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: 800,
                    fontSize: "13px",
                    opacity: addingCar ? 0.7 : 1,
                  }}
                  disabled={addingCar}
                >
                  {addingCar
                    ? editingCarId
                      ? "Updating Car..."
                      : "Adding Car..."
                    : editingCarId
                    ? "✓ Update Car"
                    : "✓ Add Car"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================
          PURCHASE STATISTICS
      ====================================== */}

      <section className="admin-stats">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <span>
              Purchase Requests
            </span>

            <strong>
              {totalRequests}
            </strong>

          </div>

        </div>

        {/* PENDING */}

        <div className="stat-card">

          <div className="stat-icon pending-icon">
            ⏳
          </div>

          <div>

            <span>
              Purchase Pending
            </span>

            <strong>
              {pendingRequests}
            </strong>

          </div>

        </div>

        {/* APPROVED */}

        <div className="stat-card">

          <div className="stat-icon approved-icon">
            ✓
          </div>

          <div>

            <span>
              Purchase Approved
            </span>

            <strong>
              {approvedRequests}
            </strong>

          </div>

        </div>

        {/* CONTACTED */}

        <div className="stat-card">

          <div className="stat-icon contacted-icon">
            ☎
          </div>

          <div>

            <span>
              Purchase Contacted
            </span>

            <strong>
              {contactedRequests}
            </strong>

          </div>

        </div>

      </section>

      {/* ======================================
          PURCHASE REQUEST SECTION
      ====================================== */}

      <section className="requests-section">

        {/* TOOLBAR */}

        <div className="requests-toolbar">

          <div>

            <p
              className="admin-small-title"
              style={{ marginBottom: "5px" }}
            >
              BUYER REQUESTS
            </p>

            <h2>
              Purchase Requests
            </h2>

            <p>
              {filteredRequests.length} request
              {filteredRequests.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          <div className="request-filters">

            {/* SEARCH */}

            <div className="admin-search">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search customer, car, email..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>

            {/* STATUS FILTER */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* ====================================
            PURCHASE LOADING
        ==================================== */}

        {loading && (

          <div className="admin-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading purchase requests...
            </p>

          </div>

        )}

        {/* ====================================
            PURCHASE ERROR
        ==================================== */}

        {!loading && error && (

          <div className="admin-error">

            <div className="error-icon">
              !
            </div>

            <h3>
              Unable to load requests
            </h3>

            <p>
              {error}
            </p>

            <button onClick={fetchRequests}>
              Try Again
            </button>

          </div>

        )}

        {/* ====================================
            PURCHASE EMPTY
        ==================================== */}

        {!loading &&
          !error &&
          filteredRequests.length === 0 && (

            <div className="admin-empty">

              <div className="empty-icon">
                📭
              </div>

              <h3>
                No purchase requests found
              </h3>

              <p>
                Try changing your search or status
                filter.
              </p>

            </div>

          )}

        {/* ====================================
            PURCHASE TABLE
        ==================================== */}

        {!loading &&
          !error &&
          filteredRequests.length > 0 && (

            <div className="requests-table-wrapper">

              <table className="requests-table">

                <thead>

                  <tr>

                    <th>
                      CUSTOMER
                    </th>

                    <th>
                      CAR
                    </th>

                    <th>
                      PRICE
                    </th>

                    <th>
                      CONTACT
                    </th>

                    <th>
                      PREFERRED DATE
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      REQUESTED ON
                    </th>

                    <th>
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredRequests.map((request) => (

                    <tr key={request._id}>

                      {/* CUSTOMER */}

                      <td>

                        <div className="customer-cell">

                          <div className="customer-avatar">

                            {request.customerName
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}

                          </div>

                          <div>

                            <strong>
                              {request.customerName ||
                                "Unknown"}
                            </strong>

                            <small>
                              Request ID:{" "}
                              {request._id?.slice(-6)}
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* CAR */}

                      <td>

                        <div className="car-cell">

                          <strong>
                            {request.carName || "—"}
                          </strong>

                          <small>
                            Car ID:{" "}
                            {request.carId ?? "—"}
                          </small>

                        </div>

                      </td>

                      {/* PRICE */}

                      <td>

                        <strong className="car-price">
                          {request.carPrice || "—"}
                        </strong>

                      </td>

                      {/* CONTACT */}

                      <td>

                        <div className="contact-cell">

                          <a
                            href={`tel:${request.mobile}`}
                          >
                            📞{" "}
                            {request.mobile || "—"}
                          </a>

                          <a
                            href={`mailto:${request.email}`}
                          >
                            ✉{" "}
                            {request.email || "—"}
                          </a>

                        </div>

                      </td>

                      {/* PREFERRED DATE */}

                      <td>

                        <span className="date-value">

                          {formatDate(
                            request.preferredDate
                          )}

                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <select
                          value={
                            request.status ||
                            "Pending"
                          }
                          disabled={
                            updatingId ===
                            request._id
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              request._id,
                              e.target.value
                            )
                          }
                          className={`admin-status-select ${getStatusClass(
                            request.status
                          )}`}
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="Approved">
                            Approved
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                        </select>

                      </td>

                      {/* REQUESTED ON */}

                      <td>

                        <span className="date-value">

                          {formatDate(
                            request.createdAt
                          )}

                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >

                          <button
                            className="view-request-btn"
                            onClick={() =>
                              openDetails(request)
                            }
                          >
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteRequest(
                                request._id
                              )
                            }
                            disabled={
                              deletingId ===
                              request._id
                            }
                            style={{
                              border:
                                "1px solid #ffd0d0",
                              background:
                                "#fff4f4",
                              color: "#d93030",
                              borderRadius: "8px",
                              padding: "9px 12px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor:
                                deletingId ===
                                request._id
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                deletingId ===
                                request._id
                                  ? 0.6
                                  : 1,
                            }}
                          >

                            {deletingId ===
                            request._id
                              ? "Deleting..."
                              : "🗑 Delete"}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </section>

      {/* =====================================================
          SELL CAR STATISTICS
      ===================================================== */}

      <section
        className="admin-stats"
        style={{
          marginTop: "30px",
        }}
      >

        {/* TOTAL SELL REQUESTS */}

        <div className="stat-card">

          <div className="stat-icon">
            🚗
          </div>

          <div>

            <span>
              Sell Car Requests
            </span>

            <strong>
              {totalSellRequests}
            </strong>

          </div>

        </div>

        {/* PENDING */}

        <div className="stat-card">

          <div className="stat-icon pending-icon">
            ⏳
          </div>

          <div>

            <span>
              Sell Pending
            </span>

            <strong>
              {pendingSellRequests}
            </strong>

          </div>

        </div>

        {/* APPROVED */}

        <div className="stat-card">

          <div className="stat-icon approved-icon">
            ✓
          </div>

          <div>

            <span>
              Sell Approved
            </span>

            <strong>
              {approvedSellRequests}
            </strong>

          </div>

        </div>

        {/* CONTACTED */}

        <div className="stat-card">

          <div className="stat-icon contacted-icon">
            ☎
          </div>

          <div>

            <span>
              Sell Contacted
            </span>

            <strong>
              {contactedSellRequests}
            </strong>

          </div>

        </div>

      </section>

      {/* =====================================================
          SELL CAR REQUEST SECTION
      ===================================================== */}

      <section
        className="requests-section"
        style={{
          marginTop: "30px",
        }}
      >

        {/* SELL TOOLBAR */}

        <div className="requests-toolbar">

          <div>

            <p
              className="admin-small-title"
              style={{
                marginBottom: "5px",
              }}
            >
              SELLER REQUESTS
            </p>

            <h2>
              Sell Car Requests
            </h2>

            <p>
              {filteredSellRequests.length} request
              {filteredSellRequests.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          <div className="request-filters">

            {/* SELL SEARCH */}

            <div className="admin-search">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search seller, car, city..."
                value={sellSearchTerm}
                onChange={(e) =>
                  setSellSearchTerm(
                    e.target.value
                  )
                }
              />

            </div>

            {/* SELL STATUS FILTER */}

            <select
              value={sellStatusFilter}
              onChange={(e) =>
                setSellStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* ====================================
            SELL LOADING
        ==================================== */}

        {sellLoading && (

          <div className="admin-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading sell car requests...
            </p>

          </div>

        )}

        {/* ====================================
            SELL ERROR
        ==================================== */}

        {!sellLoading && sellError && (

          <div className="admin-error">

            <div className="error-icon">
              !
            </div>

            <h3>
              Unable to load sell car requests
            </h3>

            <p>
              {sellError}
            </p>

            <button onClick={fetchSellRequests}>
              Try Again
            </button>

          </div>

        )}

        {/* ====================================
            SELL EMPTY
        ==================================== */}

        {!sellLoading &&
          !sellError &&
          filteredSellRequests.length === 0 && (

            <div className="admin-empty">

              <div className="empty-icon">
                🚗
              </div>

              <h3>
                No sell car requests found
              </h3>

              <p>
                Submitted seller requests will
                appear here.
              </p>

            </div>

          )}

        {/* ====================================
            SELL CAR TABLE
        ==================================== */}

        {!sellLoading &&
          !sellError &&
          filteredSellRequests.length > 0 && (

            <div className="requests-table-wrapper">

              <table className="requests-table">

                <thead>

                  <tr>

                    <th>
                      SELLER
                    </th>

                    <th>
                      CAR
                    </th>

                    <th>
                      CAR INFO
                    </th>

                    <th>
                      CITY
                    </th>

                    <th>
                      EXPECTED PRICE
                    </th>

                    <th>
                      CONTACT
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      REQUESTED ON
                    </th>

                    <th>
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredSellRequests.map(
                    (request) => (

                      <tr key={request._id}>

                        {/* SELLER */}

                        <td>

                          <div className="customer-cell">

                            <div className="customer-avatar">

                              {request.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}

                            </div>

                            <div>

                              <strong>
                                {request.name ||
                                  "Unknown"}
                              </strong>

                              <small>
                                Request ID:{" "}
                                {request._id?.slice(
                                  -6
                                )}
                              </small>

                            </div>

                          </div>

                        </td>

                        {/* CAR */}

                        <td>

                          <div className="car-cell">

                            <strong>
                              {request.brand ||
                                "—"}{" "}
                              {request.model ||
                                ""}
                            </strong>

                            <small>
                              Registration Year:{" "}
                              {request.year ||
                                "—"}
                            </small>

                          </div>

                        </td>

                        {/* CAR INFO */}

                        <td>

                          <div className="car-cell">

                            <strong>
                              {request.kmDriven ??
                                "—"}{" "}
                              KM
                            </strong>

                            <small>
                              Fuel:{" "}
                              {request.fuel ||
                                "—"}
                            </small>

                          </div>

                        </td>

                        {/* CITY */}

                        <td>

                          <span className="date-value">

                            📍{" "}
                            {request.city ||
                              "—"}

                          </span>

                        </td>

                        {/* EXPECTED PRICE */}

                        <td>

                          <strong className="car-price">

                            ₹
                            {Number(
                              request.expectedPrice ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </td>

                        {/* CONTACT */}

                        <td>

                          <div className="contact-cell">

                            <a
                              href={`tel:${request.mobile}`}
                            >
                              📞{" "}
                              {request.mobile ||
                                "—"}
                            </a>

                            <a
                              href={`mailto:${request.email}`}
                            >
                              ✉{" "}
                              {request.email ||
                                "—"}
                            </a>

                          </div>

                        </td>

                        {/* STATUS */}

                        <td>

                          <select
                            value={
                              request.status ||
                              "Pending"
                            }
                            disabled={
                              sellUpdatingId ===
                              request._id
                            }
                            onChange={(e) =>
                              handleSellStatusChange(
                                request._id,
                                e.target.value
                              )
                            }
                            className={`admin-status-select ${getStatusClass(
                              request.status
                            )}`}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Contacted">
                              Contacted
                            </option>

                            <option value="Approved">
                              Approved
                            </option>

                            <option value="Rejected">
                              Rejected
                            </option>

                          </select>

                        </td>

                        {/* REQUESTED ON */}

                        <td>

                          <span className="date-value">

                            {formatDate(
                              request.createdAt
                            )}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems:
                                "center",
                            }}
                          >

                            <button
                              className="view-request-btn"
                              onClick={() =>
                                openSellDetails(
                                  request
                                )
                              }
                            >
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteSellRequest(
                                  request._id
                                )
                              }
                              disabled={
                                sellDeletingId ===
                                request._id
                              }
                              style={{
                                border:
                                  "1px solid #ffd0d0",
                                background:
                                  "#fff4f4",
                                color: "#d93030",
                                borderRadius:
                                  "8px",
                                padding:
                                  "9px 12px",
                                fontSize:
                                  "12px",
                                fontWeight: 700,
                                cursor:
                                  sellDeletingId ===
                                  request._id
                                    ? "not-allowed"
                                    : "pointer",
                                opacity:
                                  sellDeletingId ===
                                  request._id
                                    ? 0.6
                                    : 1,
                              }}
                            >

                              {sellDeletingId ===
                              request._id
                                ? "Deleting..."
                                : "🗑 Delete"}

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

      </section>

      {/* =================================================
          PURCHASE REQUEST DETAILS MODAL
      ================================================= */}

      {selectedRequest && (

        <div
          className="request-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="request-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="request-modal-header">

              <div>

                <span className="modal-small-title">
                  PURCHASE REQUEST
                </span>

                <h2>
                  Request Details
                </h2>

              </div>

              <button
                className="modal-close-btn"
                onClick={closeDetails}
              >
                ×
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="modal-customer">

              <div className="modal-avatar">

                {selectedRequest.customerName
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}

              </div>

              <div>

                <h3>
                  {selectedRequest.customerName ||
                    "Unknown"}
                </h3>

                <p>
                  Request ID:{" "}
                  {selectedRequest._id?.slice(
                    -8
                  )}
                </p>

              </div>

            </div>

            {/* DETAILS GRID */}

            <div className="modal-details-grid">

              <div className="modal-detail-box">

                <span>
                  🚗 Car
                </span>

                <strong>
                  {selectedRequest.carName ||
                    "—"}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  💰 Price
                </span>

                <strong>
                  {selectedRequest.carPrice ||
                    "—"}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  📞 Mobile
                </span>

                <a
                  href={`tel:${selectedRequest.mobile}`}
                >
                  {selectedRequest.mobile ||
                    "—"}
                </a>

              </div>

              <div className="modal-detail-box">

                <span>
                  ✉ Email
                </span>

                <a
                  href={`mailto:${selectedRequest.email}`}
                >
                  {selectedRequest.email ||
                    "—"}
                </a>

              </div>

              <div className="modal-detail-box">

                <span>
                  📅 Preferred Date
                </span>

                <strong>
                  {formatDate(
                    selectedRequest.preferredDate
                  )}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  🕒 Requested On
                </span>

                <strong>
                  {formatDate(
                    selectedRequest.createdAt
                  )}
                </strong>

              </div>

            </div>

            {/* MESSAGE */}

            <div className="modal-message">

              <span>
                Customer Message
              </span>

              <p>
                {selectedRequest.message ||
                  "No message provided."}
              </p>

            </div>

            {/* STATUS */}

            <div className="modal-status-section">

              <span>
                Current Status
              </span>

              <select
                value={
                  selectedRequest.status ||
                  "Pending"
                }
                disabled={
                  updatingId ===
                  selectedRequest._id
                }
                onChange={(e) =>
                  handleStatusChange(
                    selectedRequest._id,
                    e.target.value
                  )
                }
                className={`admin-status-select ${getStatusClass(
                  selectedRequest.status
                )}`}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

            {/* MODAL FOOTER */}

            <div className="request-modal-footer">

              <button
                className="modal-close-bottom"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteRequest(
                    selectedRequest._id
                  )
                }
                disabled={
                  deletingId ===
                  selectedRequest._id
                }
                style={{
                  border:
                    "1px solid #ffd0d0",
                  background:
                    "#fff4f4",
                  color: "#d93030",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor:
                    deletingId ===
                    selectedRequest._id
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    deletingId ===
                    selectedRequest._id
                      ? 0.6
                      : 1,
                }}
              >

                {deletingId ===
                selectedRequest._id
                  ? "Deleting..."
                  : "🗑 Delete Request"}

              </button>

              <a
                className="modal-contact-btn"
                href={`tel:${selectedRequest.mobile}`}
              >
                📞 Contact Customer
              </a>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          SELL CAR DETAILS MODAL
      ================================================= */}

      {selectedSellRequest && (

        <div
          className="request-modal-overlay"
          onClick={closeSellDetails}
        >

          <div
            className="request-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="request-modal-header">

              <div>

                <span className="modal-small-title">
                  SELL CAR REQUEST
                </span>

                <h2>
                  Seller Details
                </h2>

              </div>

              <button
                className="modal-close-btn"
                onClick={closeSellDetails}
              >
                ×
              </button>

            </div>

            {/* SELLER */}

            <div className="modal-customer">

              <div className="modal-avatar">

                {selectedSellRequest.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}

              </div>

              <div>

                <h3>
                  {selectedSellRequest.name ||
                    "Unknown"}
                </h3>

                <p>
                  Request ID:{" "}
                  {selectedSellRequest._id?.slice(
                    -8
                  )}
                </p>

              </div>

            </div>

            {/* DETAILS GRID */}

            <div className="modal-details-grid">

              <div className="modal-detail-box">

                <span>
                  🚗 Car
                </span>

                <strong>
                  {selectedSellRequest.brand ||
                    "—"}{" "}
                  {selectedSellRequest.model ||
                    ""}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  📅 Registration Year
                </span>

                <strong>
                  {selectedSellRequest.year ||
                    "—"}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  🛣️ KM Driven
                </span>

                <strong>
                  {selectedSellRequest.kmDriven ??
                    "—"}{" "}
                  KM
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  ⛽ Fuel
                </span>

                <strong>
                  {selectedSellRequest.fuel ||
                    "—"}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  📍 City
                </span>

                <strong>
                  {selectedSellRequest.city ||
                    "—"}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  💰 Expected Price
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedSellRequest.expectedPrice ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="modal-detail-box">

                <span>
                  📞 Mobile
                </span>

                <a
                  href={`tel:${selectedSellRequest.mobile}`}
                >
                  {selectedSellRequest.mobile ||
                    "—"}
                </a>

              </div>

              <div className="modal-detail-box">

                <span>
                  ✉ Email
                </span>

                <a
                  href={`mailto:${selectedSellRequest.email}`}
                >
                  {selectedSellRequest.email ||
                    "—"}
                </a>

              </div>

              <div className="modal-detail-box">

                <span>
                  🕒 Requested On
                </span>

                <strong>
                  {formatDate(
                    selectedSellRequest.createdAt
                  )}
                </strong>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="modal-message">

              <span>
                Additional Information
              </span>

              <p>
                {selectedSellRequest.description ||
                  "No additional information provided."}
              </p>

            </div>

            {/* STATUS */}

            <div className="modal-status-section">

              <span>
                Current Status
              </span>

              <select
                value={
                  selectedSellRequest.status ||
                  "Pending"
                }
                disabled={
                  sellUpdatingId ===
                  selectedSellRequest._id
                }
                onChange={(e) =>
                  handleSellStatusChange(
                    selectedSellRequest._id,
                    e.target.value
                  )
                }
                className={`admin-status-select ${getStatusClass(
                  selectedSellRequest.status
                )}`}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

            {/* FOOTER */}

            <div className="request-modal-footer">

              <button
                className="modal-close-bottom"
                onClick={closeSellDetails}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteSellRequest(
                    selectedSellRequest._id
                  )
                }
                disabled={
                  sellDeletingId ===
                  selectedSellRequest._id
                }
                style={{
                  border:
                    "1px solid #ffd0d0",
                  background:
                    "#fff4f4",
                  color: "#d93030",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor:
                    sellDeletingId ===
                    selectedSellRequest._id
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    sellDeletingId ===
                    selectedSellRequest._id
                      ? 0.6
                      : 1,
                }}
              >

                {sellDeletingId ===
                selectedSellRequest._id
                  ? "Deleting..."
                  : "🗑 Delete Request"}

              </button>

              <a
                className="modal-contact-btn"
                href={`tel:${selectedSellRequest.mobile}`}
              >
                📞 Contact Seller
              </a>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;