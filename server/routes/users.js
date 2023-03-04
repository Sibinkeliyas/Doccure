var express = require('express');
var router = express.Router();
const userSignUp = require('../controller/user/userLoginAndSignup') // user sign up and login
const doctors = require('../controller/user/doctors');               // user doctors
const { protect } = require('../middleware/authMiddleWare');



// login

router.route('/user_signUp').post(userSignUp.user_signIUp_post)             // user sign up 

router.route('/user_login').post(userSignUp.user_login_post)                // user login

// find all doctors

router.route('/user_Find_doctors').get(doctors.user_find_doctors)                               // user find doctor

router.route('/user_search_doctors').post( doctors.user_Search_doctors)                         // user search doctor

router.route('/user_add_favorite_doctors').post(protect ,doctors.user_add_favorites_doctors)    // user search doctor

router.route('/user_favorite_doctors').post(protect ,doctors.user_favorite_doctors)               // user profile doctor

// book doctor




module.exports = router;
