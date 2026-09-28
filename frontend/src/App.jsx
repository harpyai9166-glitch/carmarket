import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import PurchaseRequest from "./pages/PurchaseRequest";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import SellCar from "./pages/SellCar";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================
            HOME PAGE
        ================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ==================================
            USED CARS PAGE
        ================================== */}

        <Route
          path="/cars"
          element={<Cars />}
        />


        {/* ==================================
            CAR DETAILS PAGE
        ================================== */}

        <Route
          path="/cars/:id"
          element={<CarDetails />}
        />


        {/* ==================================
            SELL CAR PAGE
        ================================== */}

        <Route
          path="/sell"
          element={<SellCar />}
        />


        {/* ==================================
            PURCHASE REQUEST PAGE
        ================================== */}

        <Route
          path="/purchase-request"
          element={<PurchaseRequest />}
        />


        {/* ==================================
            ABOUT PAGE
        ================================== */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* ==================================
            ADMIN LOGIN
        ================================== */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* ==================================
            ADMIN DASHBOARD
        ================================== */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;