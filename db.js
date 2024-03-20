const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log("ERROR CONNECTING TO DB: ", error);
  }
};

module.exports = connectDB;
