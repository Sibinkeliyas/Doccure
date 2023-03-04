var express = require('express');
var router = express.Router();
const doctorLogin = require('../controller/doctor/doctorLogin')     // doctor login controller

// login

router.route('/').post(doctorLogin.doctor_login)            // doctor login

module.exports = router;
