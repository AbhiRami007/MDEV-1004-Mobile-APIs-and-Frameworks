const express = require("express");
const { signUp } = require("../controllers/firebaseController");

const router = express.Router();

// Route for sign-up (create user)
router.post("/signup", signUp);

module.exports = router; // Export the router
