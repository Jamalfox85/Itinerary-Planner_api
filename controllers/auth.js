const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register a new user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.json({ message: "Registration Successful" });
  } catch (error) {
    res.status(409);
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("request: ", req.body);
  try {
    const user = await User.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
