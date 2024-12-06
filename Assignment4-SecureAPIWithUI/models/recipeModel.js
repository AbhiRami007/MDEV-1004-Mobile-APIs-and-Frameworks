/* 
	File: recipeModel.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 11 Nov 2024
*/

const mongoose = require('mongoose');

// Recipe Schema Definition
const recipeSchema = new mongoose.Schema({
    recipeName: { type: String },
    ingredients: { type: [String] },
    cookingTime: { type: String },
    difficulty: { type: String },
    cuisine: { type: String },
    description: { type: String },
    photoLink: { type: String },
    averageRating: { type: Number }
});

// Recipe model creation
const Recipe = mongoose.model('recipes', recipeSchema);

// Exporting the Recipe model
module.exports = Recipe;
