const express = require("express");
const PurchaseRequest = require("../models/PurchaseRequest");

const router = express.Router();


// =====================================================
// POST - NEW PURCHASE REQUEST
// =====================================================

router.post("/", async (req, res) => {
  try {
    const purchaseRequest = new PurchaseRequest(req.body);

    const savedRequest = await purchaseRequest.save();

    res.status(201).json({
      success: true,
      message: "Purchase request submitted successfully",
      data: savedRequest,
    });

  } catch (error) {
    console.error("Create Purchase Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit purchase request",
      error: error.message,
    });
  }
});


// =====================================================
// GET - ALL PURCHASE REQUESTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const requests = await PurchaseRequest
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    console.error("Get Purchase Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch purchase requests",
      error: error.message,
    });
  }
});


// =====================================================
// PATCH - UPDATE PURCHASE REQUEST STATUS
// =====================================================

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

    const updatedRequest = await PurchaseRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
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
        message: "Purchase request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase request status updated successfully",
      data: updatedRequest,
    });

  } catch (error) {
    console.error("Update Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update purchase request status",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE - DELETE PURCHASE REQUEST
// =====================================================

router.delete("/:id", async (req, res) => {
  try {

    const deletedRequest =
      await PurchaseRequest.findByIdAndDelete(
        req.params.id
      );


    // Request nahi mili
    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Purchase request not found",
      });
    }


    // Successfully deleted
    res.status(200).json({
      success: true,
      message: "Purchase request deleted successfully",
      data: deletedRequest,
    });

  } catch (error) {

    console.error(
      "Delete Purchase Request Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete purchase request",
      error: error.message,
    });
  }
});


module.exports = router;