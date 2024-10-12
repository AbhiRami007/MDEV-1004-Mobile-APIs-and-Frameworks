/* 
  File: userController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 12 Oct 2024
*/

const User = require('../models/userModel');

/**
 * Function to create new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with username user creation or an error message.
 */
// Register a new user (with password hashing middleware applied)
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();

        // Return user data excluding the password
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: newUser.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};