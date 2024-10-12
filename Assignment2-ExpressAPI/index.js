/* 
	File: index.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 12 Oct 2024
*/

//import express
require('dotenv').config({ path: './config.env' });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const recipeRoutes = require('./routes/recipeRoute');

//initialise express app
const app = express();

//MongoDB Atlas connection string
const mongoURI = process.env.DATABASE_URL;

//Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected");
  }).catch((error)=>{
    console.log("Connection Error")
  });

//Middleware to parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define routes
app.use('/', recipeRoutes);

//set the port
const PORT = process.env.PORT || 3000;

//start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

