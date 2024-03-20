const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const itineraryRoutes = require("./routes/itinerary");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Cors
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// Define itinerary routes
app.use("/itinerary", itineraryRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
