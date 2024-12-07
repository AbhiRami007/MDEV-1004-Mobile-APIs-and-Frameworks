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

exports.createRecipes = async (req, res) => {
  try {
    const createRecipes = new Recipe(req.body); // creating a new recipe
    await createRecipes.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: createRecipes });
    console.log("recipe successfully created");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating recipe");
  }
};

/**
 * Function to get all recipes from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns JSON response with recipes or an error message.
 * @description - Get all recipes from database
 */

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Finds all the recipes in database
    res.status(200).json(recipes);
    console.log("Recipes retrived Successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retreving recipes");
  }
};

/**
 * Function to get recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns JSON response with recipes or an error message.
 * @description - Get single recipe from database by using id
*/

exports.getRecipeById = async (req, res) => {
  try {
    const recipeById = await Recipe.findById(req.params.id); //finding a recipe by id
    if (!recipeById) {
      return res.status(404).send("Recipe is not found");
    }
    res.status(200).json({
      message: "Recipe Found successfully",
      recipe: recipeById,
    });
    console.log("Recipes is found by ID");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retreving recipes by id");
  }
};

/**
 * Function to update recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message and JSON response with recipes or an error message.
 * @description - Update recipe by id and save to database 
*/

exports.updateRecipe = async (req, res) => {
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      //finding by id to update
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateRecipe) {
      return res.status(404).send("Recipes is not Update and has a error");
    }
    res
      .status(201)
      .json({ message: "Recipe Updated successfully", recipe: updateRecipe });
    console.log("Recipe is updated", updateRecipe);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error updating recipe");
  }
};

/**
 * Function to delete recipe by Id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on deletion or an error message.
 * @description - delete recipe by id from database 
*/

exports.deleteRecipe = async (req, res) => {
  try {
    const deleteRecipes = await Recipe.findByIdAndDelete(req.params.id); // finding by id to delete
    if (!deleteRecipes) {
      return res.status(404).send("Recipe is not deleted");
    }
    res
      .status(201)
      .json({ message: "Recipe Deleted successfully", recipe: deleteRecipes });
    console.log("Recipe is deleted", deleteRecipes);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting a recipe");
  }
};
