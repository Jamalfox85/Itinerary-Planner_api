const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    dateRange: {
      type: Array,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
    restaurants: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
