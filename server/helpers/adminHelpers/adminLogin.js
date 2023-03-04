const passwordHashing = require('../commonHelpers/passwordHashing')  // password hashing
const adminLoginShema = require('../../model/admin/adminLoginSchema')
const { resolve } = require('promise')


module.exports = {
    doSignUp : (adminData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let admin = await adminLoginShema.findOne({email : adminData.email})
                if(!admin) {
                    passwordHashing.doBcrypt(adminData.password).then((data) => {
                        adminData.password = data
                        adminLoginShema.create(adminData).then((data) => {
                            resolve(data)
                        }).catch((e) => resolve(e))
                    }).catch((err) => {
                        reject(err)
                    })
            } else {
                reject('admin already registered')
            }
            } catch (err) {
                reject(err)
            }
        })
    },
    dogLogin : (adminData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let admin = await adminLoginShema.findOne({email : adminData.email})
                if(admin) {
                    passwordHashing.doBcryptCompare(adminData.password , admin.password).then((data) => {
                        resolve({status : true ,admin})       
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject("invalid admin")
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}
