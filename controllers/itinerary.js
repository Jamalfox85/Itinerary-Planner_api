const Itinerary = require("../models/Itinerary");

const getItineraries = async (req, res, next) => {
  try {
    const user_id = req.headers.user_id;
    let itineraries = await Itinerary.find({ user_id });
    itineraries = itineraries.sort((a, b) => {
      return a.dateRange[0] - b.dateRange[0];
    });
    res.json({ itineraries });
  } catch (error) {
    // res.next(409);
  }
};

const getItinerary = async (req, res, next) => {
  try {
    const itineraryId = req.params.itineraryId;
    const itineraryDetails = await Itinerary.find({ _id: itineraryId });
    console.log("DETAILS: ", itineraryDetails);
    res.json(itineraryDetails[0]);
  } catch (error) {
    res.json({ error });
  }
};

const addItinerary = async (req, res, next) => {
  const { user_id, title, location, dateRange } = req.body;

  try {
    const itinerary = new Itinerary({ user_id, title, location, dateRange });
    await itinerary.save();
    res.json({ message: "Itinerary Saved", itinerary });
  } catch (error) {
    res.json({ error });
  }
};

const addActivity = async (req, res, next) => {
  const { itinerary_id, activity } = req.body;

  try {
    const itinerary = Itinerary.updateOne({ _id: itinerary_id }, { $push: { activities: activity } }).exec();
    await itinerary.save();
    res.json({ message: "Activity Saved", itinerary });
  } catch (error) {
    res.json({ error });
  }
};

const updateActivities = async (req, res, next) => {
  const { itinerary_id, activityList } = req.body;
  console.log("UPDATING", itinerary_id, activityList);
  try {
    const itinerary = Itinerary.updateOne({ _id: itinerary_id }, { $set: { activities: activityList } }).exec();
    await itinerary.save();
    res.json({ message: "Activities Updated", itinerary });
  } catch (error) {
    res.json({ error });
  }
};

const addRestaurant = async (req, res, next) => {
  const { itinerary_id, restaurant } = req.body;

  try {
    const itinerary = Itinerary.updateOne({ _id: itinerary_id }, { $push: { restaurants: restaurant } }).exec();
    await itinerary.save();
    res.json({ message: "Restaurant Saved", itinerary });
  } catch (error) {
    res.json({ error });
  }
};

const deleteRestaurant = async (req, res, next) => {
  const { itinerary_id, restaurant } = req.body;

  try {
    const itinerary = Itinerary.updateOne({ _id: itinerary_id }, { $pull: { restaurants: { name: restaurant.name } } }).exec();
    await itinerary.save();
    res.json({ message: "Restaurant Deleted", itinerary });
  } catch (error) {
    res.json({ error });
  }
};

const deleteItinerary = async (req, res, next) => {
  try {
    await Itinerary.deleteOne({ _id: req.headers.itinerary_id }).then((response) => {
      console.log(response);
    });
    console.log("ID: ", req.headers.itinerary_id);
    res.json({ data, error });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { getItineraries, getItinerary, addItinerary, addActivity, updateActivities, addRestaurant, deleteRestaurant, deleteItinerary };
