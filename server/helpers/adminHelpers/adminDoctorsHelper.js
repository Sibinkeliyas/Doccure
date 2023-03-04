const passwordHashing = require('../commonHelpers/passwordHashing')
const doctorSchema = require ('../../model/doctor/doctorSchema')

module.exports = {
    doAdd : (doctorData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let doctor = await doctorSchema.findOne({email : doctorData.email})
                if(!doctor) {
                    passwordHashing.doBcrypt(doctorData.password).then((data) => {
                        doctorData.password = data
                        doctorSchema.create(doctorData).then((data) => {
                            resolve(data)
                        }).catch((e) => {
                            reject(e)
                        })
                    }).catch((e) => {
                        reject(e)
                    })
                } else {
                    reject("doctor already registerd")
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doAllDoctors : () => {
        return new Promise((resolve, reject) => {
            try {
                doctorSchema
                .find().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doDeleteDoctors : (doctorId) => {
        return new Promise((resolve, reject) => {
            try {
                doctorSchema.deleteOne({_id : doctorId}).then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}