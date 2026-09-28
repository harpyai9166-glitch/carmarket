const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    price: {
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

    transmission: {
      type: String,
      required: true,
    },

    bodyType: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);