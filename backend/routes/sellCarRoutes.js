const express = require("express");
const SellCar = require("../models/SellCar");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const sellCar = new SellCar(req.body);

    const savedSellCar = await sellCar.save();

    res.status(201).json({
      success: true,
      message: "Car selling request submitted successfully",
      data: savedSellCar,
    });
  } catch (error) {
    console.error("Create Sell Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit car selling request",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await SellCar.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get Sell Car Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sell car requests",
      error: error.message,
    });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Contacted",
      "Approved",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedRequest = await SellCar.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell car request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sell car request status updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Update Sell Car Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest =
      await SellCar.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell car request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sell car request deleted successfully",
      data: deletedRequest,
    });
  } catch (error) {
    console.error("Delete Sell Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete sell car request",
      error: error.message,
    });
  }
});

module.exports = router;