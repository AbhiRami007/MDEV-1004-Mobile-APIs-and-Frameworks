/* 
	File: userRoute.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 11 Nov 2024
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Log in a user
router.post('/login', userController.loginUser);

// Log out a user
router.post('/logout', userController.logoutUser);

module.exports = router;