/* 
	File: recipeRoute.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 11 Nov 2024
*/

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const verifyToken = require('../middleware/auth');

//Route to import recipes
router.post('/import',recipeController.importRecipes);

// POST route for creating recipe
router.post('/', verifyToken, recipeController.createRecipe);

// GET route for all recipes
router.get('/', recipeController.getAllRecipes);

// GET route to find recipe by id
router.get('/:id', recipeController.getRecipeById);

// PUT route to update recipe by id
router.put('/:id',verifyToken, recipeController.updateRecipe);

//Route to delete a movie by id
router.delete('/:id', verifyToken, recipeController.deleteRecipe);

module.exports = router;
