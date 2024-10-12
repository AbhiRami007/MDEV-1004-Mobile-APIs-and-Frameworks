/* 
	File: recipeModel.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 12 Oct 2024
*/

const mongoose = require('mongoose');

// Recipe Schema Definition
const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true },
    ingredients: { type: [String], required: true },
    cookingTime: { type: String, required: true },
    difficulty: { type: String, required: true },
    cuisine: { type: String, required: true },
    description: { type: String, required: true },
    photoLink: { type: String, required: true },
    averageRating: { type: Number, required: true }
});

// Recipe model creation
const Recipe = mongoose.model('recipes', recipeSchema);

// Exporting the Recipe model
module.exports = Recipe;
