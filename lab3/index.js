const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });

// Initialize the express app
const app = express();

//Read data from movies.json
const data = JSON.parse(fs.readFileSync('./movies.json','utf-8'));

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
