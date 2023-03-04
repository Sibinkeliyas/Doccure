const adminHelpers = require('../../helpers/adminHelpers/adminLogin')

exports.admin_register_post = ((req , res) => {               // admin signup
    try {
        adminHelpers.doSignUp(req.body).then((data) => {
            res.status(200).send(true)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
})


exports.admin_login_post = (req , res) => {                     // admin login
    try {
        adminHelpers.dogLogin(req.body).then((data) => {
            res.status(200).send(data.admin)  
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}
