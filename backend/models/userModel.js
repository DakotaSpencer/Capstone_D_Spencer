const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // username:{
    //     type: String,
    //     required: false,
    //     //change required to True later and update accordingly
    //     unique: false
    // },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)