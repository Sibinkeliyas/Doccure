const doctorSchema = require('../../model/doctor/doctorSchema')
const favDoctors = require('../../model/user/favoriteDoctor')
const mongoose = require('mongoose')


module.exports = {
    doSearchDoctotor : ( gender , specialities) => {
      return new Promise(async(resolve, reject) => {
       try {
            if(Object.keys(gender).length !== 0 && Object.keys(specialities).length !== 0) {
                var promises = [];
                for (let gen in gender) {
                    for(let speciality in specialities) {
                        promises.push(
                            await doctorSchema.find({gender : gen,speciality:speciality}).then(data => {
                               return data
                             })
                        )
                    }
                 
                }
                resolve(promises.flat(1))
            } else if(Object.keys(gender).length !== 0) {
                var promises = [];
                for (let gen in gender) {
                  promises.push(
                   await doctorSchema.find({gender : gen}).then(data => {
                      return data
                    })
                  )
                }
                resolve(promises.flat(1))
            } else if( Object.keys(specialities).length !== 0) {
                var promises = [];
                    for(let speciality in specialities) {
                        promises.push(
                            await doctorSchema.find({speciality:speciality}).then(data => {
                               return data
                             })
                        )
                    }
                 
                resolve(promises.flat(1))
            } else {
                    doctorSchema.find().then((data) => {
                        resolve(data)
                    })     
            }
       } catch (err) {
        console.log(err);
            reject(err)
       }
      })
    } ,                                        
    doAddToFavorites : (data) => {
        return new Promise(async(resolve, reject) => {
            if(data.from === "google") {
                data.userId = mongoose.Types.ObjectId(data.userId+"abf")
            }
            try {
               let userFav = await favDoctors.findOne({userId : data.userId})
               console.log(userFav);
               if(userFav) {
                let favDoc = userFav.doctorId.findIndex((doctorId) => doctorId == data.doctorId)
                console.log(favDoc);
                if(favDoc !== -1) {
                    favDoctors.updateOne({userId : data.userId} , {$pull : {doctorId :  data.doctorId}}).then((Data) => {
                        console.log(Data);
                        resolve(Data)
                    })
                } else {
                    favDoctors.updateOne({userId : data.userId} , {$addToSet : {doctorId : data.doctorId}}).then((data) => {
                        resolve(data)
                    })
                }
               } else {
               
                favDoctors.create(data).then((Data) => {
                    resolve(Data)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
               }
            } catch (err) {
                console.log(err);
                reject(err)
            }
        })
    } ,
    doFavoriteDoctors : (data) => {
        console.log(data);
        if(data.from === "google") {
            console.log("from google llllllllllllllllllllllllllllllllll");
            data.userId = mongoose.Types.ObjectId(data.userId+"abf")
        }
       return new Promise((resolve, reject) => {
        try {
            favDoctors.findOne({userId : data.userId}).populate('doctorId').exec((err , data) => {
                if(err) {
                    console.log(err);
                    reject(err)
                } else {
                    console.log(data);
                    resolve(data)
                }
            })
        } catch (err) {
            console.log(err);
            reject(err)
        }
       })
    } ,
    doDoctorProfile : (doctorID) => {
        return new Promise((resolve, reject) => {
            try {
                doctorSchema.findOne({_id : doctorID}).then((Data) => {
                    resolve(Data)
                }).catch((err) => {
                    resolve(err)
                })
            } catch (err) {
                resolve(err)
            }
        })
    }
}