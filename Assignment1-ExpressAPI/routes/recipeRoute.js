const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET route for all recipes
router.post('/recipes', recipeController.createRecipes);

module.exports = router;
