var express = require('express');
var router = express.Router();
const adminLogin = require('../controller/admin/adminLogin')          // admin login controller
const adminSpeciality = require('../controller/admin/speciality')     // admin speciality controller
const doctors = require('../controller/admin/doctors')                // admin doctors



// login

router.route('/').post(adminLogin.admin_register_post)                //  admin register page.

router.route('/admin-login').post(adminLogin.admin_login_post)        //  admin login page.

// speciality

router.route('/admin-add-speciality').post(adminSpeciality.admin_add_speciality)          //  admin add speciality page.

router.route('/admin-speciality').get(adminSpeciality.admin_speciality)                  //  admin add speciality page.

router.route('/admin-Find-speciality').get(adminSpeciality.admin_find_speciality)        //  admin update speciality page.

router.route('/admin-update-speciality').post(adminSpeciality.admin_update_speciality)    //  admin update speciality page.

router.route('/admin-delete-speciality').post(adminSpeciality.admin_delete_speciality)    //  admin delete speciality page.

// doctor

router.route('/admin-add-doctors').post(doctors.admin_add_doctors)                 //  admin add  page.

router.route('/admin-find-doctors').get(doctors.admin_doctors)                     //  admin find doctors  page.

router.route('/admin-delete-doctors').post(doctors.admin_delete_doctors)            //  admin find doctors  page.


module.exports = router;
