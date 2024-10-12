/* 
  File: recipeController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 12 Oct 2024
*/

const Recipe = require('../models/recipeModel');
const fs = require("fs");

/**
 * Function to import recipes to database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on movies creation or an error message.
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

/**
 * Function to get all recipes from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns JSON response with recipes or an error message.
 */

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Function to get recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns JSON response with recipes or an error message.
 */

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(201).json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving the Recipe");
  }
};

/**
 * Function to update recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message and JSON response with recipes or an error message.
 */

exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).send("Recipe is not updated");
    }
    res
      .status(201)
      .json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error updating the Recipe");
  }
};

/**
 * Function to delete recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on deletion or an error message.
 */

exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(201).json({ message: "Recipe deleted successfully", deletedRecipe });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting the Recipe");
  }
};