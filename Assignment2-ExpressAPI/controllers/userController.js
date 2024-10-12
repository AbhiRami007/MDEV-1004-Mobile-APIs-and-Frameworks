/* 
  File: userController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 12 Oct 2024
*/

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Function to create new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with username user creation or an error message.
 * @description - Register a new user (with password hashing middleware applied)
*/

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

				//Hash incoming password before saving
				const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
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

/**
 * Function to create new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on login or an error message.
 * @description - Login a user with password
*/

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
				const matchPassword = await bcrypt.compare(password, user.password)
        if (!user || !matchPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
			 	res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};