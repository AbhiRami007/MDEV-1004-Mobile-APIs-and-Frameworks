const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',authController.registerUser);

router.get('/login',passport.authenticate('local'),(req,res)=>{
    res.send('Logged in successfully');
})

//Route to logout
router.get('/logout', authController.logoutUser)

module.exports = router;