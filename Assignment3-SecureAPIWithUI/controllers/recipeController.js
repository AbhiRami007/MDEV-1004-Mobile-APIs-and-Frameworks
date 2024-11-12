/* 
  File: recipeController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 11 Nov 2024
*/

const Recipe = require('../models/recipeModel');
const fs = require("fs");

/**
 * Function to import recipes to database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on movies creation or an error message.
 * @description - Import recipes to database
 */

exports.importRecipes = async (req, res) => {
  try {
    // Read data from recipes.json
    const data = JSON.parse(fs.readFileSync("./recipes.json", "utf-8"));
    const count = await Recipe.countDocuments();
    if (count === 0) {
      await Recipe.create(data);
      res.status(200).send("Data successfully imported to mongoDB");
    } else {
      res.status(200).send("Data already exists, skipping import");
    }
  } catch (e) {
    res.status(500).send("Error importing data");
  }
};

/**
 * Function to create recipes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with JSON data on recipe creation or an error message.
 * @description - create a new recipes and save to database 
*/

exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({ message: "Recipe created Successfully", recipe });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating Recipe");
  }
};

