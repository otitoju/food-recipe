const mongoose = require('mongoose')
//const email = require('mongoose-type-email') //To be install later

const userSchema = new mongoose.Schema({
    name:{type: String, required:true},
    username:{type: String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:String,
    resetpassword: String
})
module.exports = mongoose.model('user',userSchema)
// user database