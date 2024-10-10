const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });
const moviesRoutes = require('./src/routes/moviesRoute')
// Initialize MongoDB connection
const InitializeMongoServer = require('./db');
const { logger, handleNotFound } = require('./src/middleware/moviesMiddleware');
InitializeMongoServer();

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);//apply logger middleware

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the first program of Node.js Express');
});

//Use the movies routes
app.use('/movie', moviesRoutes);
app.use(handleNotFound);//404 handler for routes not defined
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