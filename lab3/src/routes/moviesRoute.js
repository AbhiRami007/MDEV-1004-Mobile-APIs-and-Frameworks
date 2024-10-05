const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');

//Route to import movies
router.post('/import',movieController.importMovies);

//Route to get all movies
router.get('/',movieController.getAllMovies);

//Route to get movie by id
router.get('/:id',movieController.getMovieById);

//Route to get movie by id
router.post('/',movieController.createMovie);

module.exports = router;