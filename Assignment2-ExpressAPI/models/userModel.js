/* 
	File: userModel.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 12 Oct 2024
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
