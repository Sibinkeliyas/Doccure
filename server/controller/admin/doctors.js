const adminDoctor = require('../../helpers/adminHelpers/adminDoctorsHelper')

exports.admin_add_doctors = (req , res ) => {
    try {
        adminDoctor.doAdd(req.body).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (error) {
        res.status(401).send(error)
    }
}

exports.admin_doctors = (req , res ) => {
    try {
        adminDoctor.doAllDoctors().then((data) => {
            res.status(200).send(data)
        }).catch((error) => {
            res.status(401).send(error)
        })
    } catch (error) {
        res.status(401).send(error)
    }
}

exports.admin_delete_doctors = (req , res ) => {
    try {
        adminDoctor.doDeleteDoctors(req.query.id).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}