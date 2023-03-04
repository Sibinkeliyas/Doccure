const doctors = require('../../helpers/adminHelpers/adminDoctorsHelper')
const doctor = require('../../helpers/userHelpers/userDoctorHelper')

exports.user_find_doctors = (req , res ) => {
    try {
        doctors.doAllDoctors().then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_Search_doctors = (req , res ) => {
    try {
        doctor.doSearchDoctotor(req.body.gender , req.body.speciality)
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.user_add_favorites_doctors = (req , res) => {
    try {
        doctor.doAddToFavorites(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.user_favorite_doctors = (req ,res ) => {
    try {
        doctor.doFavoriteDoctors(req.body).then((Data) => {
            res.status(200).json(Data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_doctor_profile = (req , res ) => {
    try {
        
    } catch (err) {
        
    }
}