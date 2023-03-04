const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    // age : {
    //     type : Number,
    //     required : true
    // },
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

const model = mongoose.model("user",userSchema)
module.exports = model;