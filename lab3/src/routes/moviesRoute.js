const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const { validateMovie } = require('../middleware/moviesMiddleware');

//Route to import movies
router.post('/import',movieController.importMovies);

//Route to get all movies
router.get('/',movieController.getAllMovies);

//Route to get movie by id
router.get('/:id',movieController.getMovieById);

//Route to create new movie
router.post('/create',validateMovie, movieController.createMovie);

//Route to update a movie by id
router.put('/update/:id', validateMovie, movieController.updateMovie);

//Route to delete a movie by id
router.delete('/delete/:id',movieController.deleteMovie);


module.exports = router;