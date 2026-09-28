const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const purchaseRequestRoutes = require("./routes/purchaseRequestRoutes");
const sellCarRoutes = require("./routes/sellCarRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error");
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Car Marketplace Backend is Running",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// Purchase Request Routes
app.use("/api/purchase-requests", purchaseRequestRoutes);

// Sell Car Routes
app.use("/api/sell-cars", sellCarRoutes);

// Car Inventory Routes
app.use("/api/cars", carRoutes);

// TEMPORARY TEST ROUTE
app.get("/api/sell-test", (req, res) => {
  res.json({
    success: true,
    message: "SELL ROUTE SERVER IS WORKING",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});