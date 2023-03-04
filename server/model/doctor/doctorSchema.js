const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema ({
      doctorName : {
        type : String , 
        require : true
      } ,
      specialityId : {
        type : mongoose.Types.ObjectId ,
        require : true
      } ,
      speciality : {
        type : String , 
        require : true
      } ,
      profile : {
        type : String , 
      } , 
      gender : {
        type : String , 
        require : true
      } , 
      email : {
        type : String, 
        require : true
      } , 
      phone : {
        type : Number
      } ,
      password : {
        type : String , 
        require : true
      } ,
      timeSchedule : {
        type : Array
      },
      education : {
        type : Array
      } ,
      reviews : {
        type : Array
      }
})

const model = mongoose.model('doctor' , doctorSchema)

module.exports = model