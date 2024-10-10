/* 
  File: moviesController.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 05 Oct 2024
*/

const Movie = require("../models/moviesModel");
const fs = require("fs");

/**
 * Function to import movies to database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Returns success message on movies creation or an error message.
 */

exports.importMovies = async (req, res) => {
  try {
    // Read data from movies.json
    const data = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.create(data);
      res.status(200).send("Data successfully imported to mongoDB");
    } else {
      res.status(200).send("Data already exists, skipping import");
    }
  } catch (e) {
    res.status(500).send("Error importing data");
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving Movies");
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    res.status(201).json(movie);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving the Movie");
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie created Successfully", movie });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating Movies");
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).send("Movie is not updated");
    }
    res
      .status(201)
      .json({ message: "Movie updated successfully", updatedMovie });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error updating the Movies");
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).send("Movie not found");
    }
    res.status(201).json({ message: "Movie deleted successfully", deletedMovie });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting the Movies");
  }
};
