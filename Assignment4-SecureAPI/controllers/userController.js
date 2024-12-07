/* 
  File: userController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 11 Nov 2024
*/

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Function to create new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with username user creation or an error message.
 * @description - Register a new user (with password hashing middleware applied)
 */

exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    //Validate the inputs
    if (!username || !password || !email) {
      return res.status(400).json({ messeage: "all field are required" });
    }
    //Checking if the email is valid
    if (typeof email !== "string" || email.trim() == "") {
      return res
        .status(400)
        .json({ message: "Invalid email address, please re-enter / check" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash incoming password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Return user data excluding the password
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error details -", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * Function to login user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on login or an error message.
 * @description - Login a user with password
 */

exports.loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    //Validating the user information
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    //checking for existing user
    const user = await User.findOne({ email });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!user || !matchPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    //Create token for the user
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    console.error("Error details -", error);
    return res.status(500).json({ message: "Error Logging user" });
  }
};

/**
 * Function to logout user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on logout.
 * @description - Logout user
 */
exports.logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
