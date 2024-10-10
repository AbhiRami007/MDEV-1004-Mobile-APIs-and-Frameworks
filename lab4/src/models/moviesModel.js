/* 
	File: moviesModel.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 10 Oct 2024
*/

const mongoose = require('mongoose');

// Movie Schema Definition
const MoviesSchema = new mongoose.Schema({
    movieID:{type:String},
    title :{type:String},
    studio:{type:String},
    genres:[{type:String}],
    directors:[
        {type:String},
    ],
    writers:[{type:String}],
    actors:[{type:String}],
    year:{type:Number},
    length:{type:Number},
    shortDescription:{type:String},
    mpaRating:{type:String},
    criticsRating:{type:Number}

})

// Movies model creation
const Movie = mongoose.model('Movies',MoviesSchema);

// Exporting the Movie model
module.exports = Movie;