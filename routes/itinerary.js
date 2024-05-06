const express = require("express");
const { getItineraries, getItinerary, addItinerary, addActivity, updateActivities, addRestaurant, deleteRestaurant, deleteItinerary } = require("../controllers/itinerary");

const router = express.Router();

router.get("/itineraries", getItineraries);
router.get("/itinerary/:itineraryId", getItinerary);
router.post("/add", addItinerary);
router.put("/addActivity", addActivity);
router.put("/updateActivities", updateActivities);
router.put("/addRestaurant", addRestaurant);
router.put("/deleteRestaurant", deleteRestaurant);
router.delete("/delete", deleteItinerary);
module.exports = router;
