const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');

//Route to import movies
router.post('/import',movieController.importMovies);

//Route to get all movies
router.get('/',movieController.getAllMovies);

//Route to get movie by id
router.get('/:id',movieController.getMovieById);

//Route to create new movie
router.post('/',movieController.createMovie);

//Route to update a movie by id
router.put('/:id', movieController.updateMovie);

//Route to delete a movie by id
router.delete('/:id',movieController.deleteMovie);


module.exports = router;