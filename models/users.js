const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    token:String,
})


exports.USERS = mongoose.model('users',userSchema)