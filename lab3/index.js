const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });

// Initialize MongoDB connection
const InitializeMongoServer = require('./db');
InitializeMongoServer();

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the first program of Node.js Express');
});

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});