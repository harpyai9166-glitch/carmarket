const express = require("express");
const Car = require("../models/Car");

const router = express.Router();

// GET ALL CARS
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Get Cars Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message,
    });
  }
});

// GET SINGLE CAR
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Get Single Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch car",
      error: error.message,
    });
  }
});

// ADD NEW CAR
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);

    const savedCar = await car.save();

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      data: savedCar,
    });
  } catch (error) {
    console.error("Add Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add car",
      error: error.message,
    });
  }
});

// UPDATE CAR
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update car",
      error: error.message,
    });
  }
});

// UPDATE CAR STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Available", "Sold"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car status",
      });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car status updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update Car Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update car status",
      error: error.message,
    });
  }
});

// DELETE CAR
router.delete("/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      data: deletedCar,
    });
  } catch (error) {
    console.error("Delete Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete car",
      error: error.message,
    });
  }
});

module.exports = router;