/* 
	File: recipeRoute.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 12 Oct 2024
*/

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

//Route to import recipes
router.post('/import',recipeController.importRecipes);

module.exports = router;
