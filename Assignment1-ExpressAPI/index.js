//import express
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const recipeRoutes = require('./routes/recipeRoutes');

//initialise express app
const app = express();

//MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://psabhirami015:qA2b9fEc4MLzbI6M@recipescluster.yfqeq.mongodb.net/?retryWrites=true&w=majority&appName=RecipesCluster";

//Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected");
  }).catch((error)=>{
		console.log("Connection Error")
	});

//Middleware to parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define routes
app.use('/', recipeRoutes);

//set the port
const PORT = 3000;

//start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
