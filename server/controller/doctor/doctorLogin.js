const doctor = require('../../helpers/doctorHelpers/doctorLogin')

exports.doctor_login = (req ,res ) => {
    try {
        doctor.doLogin(req.body).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}