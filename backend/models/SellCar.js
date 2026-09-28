const mongoose = require("mongoose");

const sellCarSchema = new mongoose.Schema(
  {
    name: {
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

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    kmDriven: {
      type: Number,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    expectedPrice: {
      type: Number,
      required: true,
    },

    description: {
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

module.exports = mongoose.model("SellCar", sellCarSchema);