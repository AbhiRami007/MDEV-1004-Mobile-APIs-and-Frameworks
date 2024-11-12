/* 
	File: recipeRoute.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 11 Nov 2024
*/

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

//Route to import recipes
router.post('/import',recipeController.importRecipes);

// POST route for creating recipe
router.post('/', recipeController.createRecipe);

// GET route for all recipes
router.get('/', recipeController.getAllRecipes);

// GET route to find recipe by id
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
