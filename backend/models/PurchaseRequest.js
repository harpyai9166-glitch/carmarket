const mongoose = require("mongoose");

const purchaseRequestSchema = new mongoose.Schema(
  {
    carId: {
      type: Number,
      required: true,
    },

    carName: {
      type: String,
      required: true,
    },

    carPrice: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    preferredDate: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseRequest",
  purchaseRequestSchema
);