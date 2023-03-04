const specialitySchema = require('../../model/admin/speciality')

module.exports = {
    doAddSpeciality : (specialityData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({speciality : specialityData.speciality})
                if(!speciality) {
                    specialitySchema.create(specialityData).then((data) => {
                        resolve(data)
                    }).catch((e) => {
                       reject(e)
                    })
                } else {
                    resolve("speciality already exist")
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doFindAllSpeciality : () => {
        return new Promise((resolve, reject) => {
           try {
                specialitySchema.find().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
           } catch (error) {
                reject(error)
           }
        })
    } ,
    doFindSpeciality : (specialityID) => {
        return new Promise(async(resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({_id : specialityID})
                if(speciality) {
                    resolve(speciality)
                } else {
                    reject()
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doUpdateSpeciality : (specialityData) => {
        return new Promise(async (resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({_id : specialityData._id})
                let sameSpeciality = await specialitySchema.find({_id : {$ne : specialityData._id } , speciality : specialityData.speciality})
                if(speciality && sameSpeciality.length === 0) {
                    specialitySchema.updateOne({_id : specialityData._id} , {$set : {speciality : specialityData.speciality ,
                         specialityImage : specialityData.specialityImage}} , { upsert: true })
                    .then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    } , 
    doDeleteSpeciality : (specialityId) => {
        return new Promise(async(resolve, reject) => {
           try {
                specialitySchema.deleteOne({_id : specialityId})
                .then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
           } catch (error) {
                reject(error)
           }
        })
    }
}