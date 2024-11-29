const admin = require("../models/firebaseModel"); // Correctly import admin from firebaseModel.js

// Controller for sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUp };
