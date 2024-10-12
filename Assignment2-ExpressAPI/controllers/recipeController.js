/* 
  File: recipeController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 12 Oct 2024
*/

const Recipe = require('../models/recipeModel');
const xlsx = require('xlsx');

/**
 * Function to get all recipes from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message with JSON data on recipe creation or an error message.
 */

exports.createRecipes = async (req, res) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile('Recipes.xlsx');
        
        // The first sheet contains the recipes
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data to JSON
        let recipeData = xlsx.utils.sheet_to_json(worksheet);

        recipeData = recipeData.map(recipe => {
            // Remove _id field from the xlsx data to store mongo _id object value
            delete recipe._id;

            //Converting ingredients from xlsx data to an array of ingredients
            const ingredients = Object.keys(recipe)
                .filter(key => key.startsWith('ingredients['))
                .map(key => recipe[key]);

            // Remove individual ingredients data after creating array of ingredients.
            recipe.ingredients = ingredients;
            Object.keys(recipe).forEach(key => {
                if (key.startsWith('ingredients[')) {
                    delete recipe[key];
                }
            });

            return recipe;
        });

        // Insert recipes into the database
        const recipes = await Recipe.insertMany(recipeData);
        res.status(200).json({ message: "Recipes Created", data: recipes });
    } catch (error) {
        res.status(500).json({ message: error.message });
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