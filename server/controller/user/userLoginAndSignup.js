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
      if(req.body.googleCodeResponce) {
        console.log(req.body.googleCodeResponce);
        let details = {
          email : req.body.googleCodeResponce.email , 
          name : req.body.googleCodeResponce.name ,
          _id : req.body.googleCodeResponce.id ,
          token : generateToken(req.body.googleCodeResponce.id) ,
          picture : req.body.googleCodeResponce.picture , 
          from : "google"
        }
        res.status(200).json(details)
      } else {
        user_login.doLogin(req.body).then((data) => {
          let details = {
              _id : data._id , 
              name : data.name , 
              email : data.email,
              phone : data.phone ,
              token : generateToken(data._id) , 
              from : "loclal"
          }
            res.status(200).json(details)
        }).catch((err) => {
            res.status(401).json(err)
        })
      }
     } catch (err) {
        res.status(401).json(err)
     }
}