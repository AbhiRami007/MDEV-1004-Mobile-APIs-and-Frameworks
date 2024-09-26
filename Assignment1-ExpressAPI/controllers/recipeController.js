/* 
  File: recipeController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 26 Sep 2024
*/

const Recipe = require('../models/recipeModel');

/**
 * Function to get all recipes from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with JSON data on recipe creation or an error message.
 */

exports.createRecipes = async (req, res) => {
    try {
        const recipeData = req.body;
        const recipes = await Recipe.create(recipeData);
        res.status(200).json({ message: "Recipe Created", data:recipes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};