const userSchema = require('../../model/user/userLoginSchema')
const passwordHashing = require('../commonHelpers/passwordHashing')

module.exports = {
    doSignUp : (userData) => {
      return new Promise(async(resolve, reject) => {
        try {
          let user = await userSchema.findOne({email : userData.email})
          if(!user) {
            passwordHashing.doBcrypt(userData.password).then((data) => {
              userData.password = data
                userSchema.create(
                  userData
                ).then((data) => {
                  resolve(data)
                }).catch((e) => {
                  reject(e)
                })
            })
        } else {
          reject('user already registered')
        }
        } catch (err) {
          reject(err)
        }
      })
    } ,

    doLogin : (userData) => {
      return new Promise(async(resolve, reject) => {
        try {
          let user = await userSchema.findOne({email : userData.email})
          if(user !== null) {
              passwordHashing.doBcryptCompare(userData.password , user.password).then((data) => { 
                resolve(user)
              }).catch((err) => {
                reject(err)
              })
          } else {
              reject("Invalid user")
          }
        } catch (err) {
          reject(err)
        }
      })
    }
}