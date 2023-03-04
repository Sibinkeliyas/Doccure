const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    profile : {
        type : String , 
    } ,
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number , 
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const model = mongoose.model("admin",adminSchema)
module.exports = model;