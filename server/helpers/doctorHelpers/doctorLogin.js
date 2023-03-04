const doctorSchema = require('../../model/doctor/doctorSchema')
const passwordHashing = require('../commonHelpers/passwordHashing')

module.exports = {
    doLogin : (doctorData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let doctor  = await doctorSchema.findOne({email : doctorData.email})
                if(doctor) {
                    passwordHashing.doBcryptCompare(doctorData.password , doctor.password).then((data) => {
                        doctorData.password = data
                        resolve(doctor)
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject('Invalid doctor')
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}