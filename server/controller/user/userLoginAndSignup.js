// user helpers
const user_login = require('../../helpers/userHelpers/login')
const generateToken = require('../../middleware/generateToken')





exports.user_signIUp_post = (req,res , next) => {                    // user sign up
    try {
      user_login.doSignUp(req.body).then((data) => {
          res.status(200).send(data)
      }).catch((err) => {
        res.status(401).json(err)
      })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_login_post = async(req , res ) => {            // user login
     try {
   
        user_login.doLogin(req.body).then((data) => {
          let details = {
              _id : data._id , 
              userName : data.name , 
              email : data.email,
              phone : data.phone ,
              token : generateToken(data._id)
          }
            res.status(200).json(details)
        }).catch((err) => {
            res.status(401).json(err)
        })
      
      
     } catch (err) {
        res.status(401).json(err)
     }
}