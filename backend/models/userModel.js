const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: false,
        //change required to True later and update accordingly
        unique: false
    },
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

// Static signup method
userSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({email})

    if (exists){
        throw Error('Email is already in use.')
    }

    //salt and hash password, and store in database

    //generates salt
    const salt = await bcrypt.genSalt(10)
    //hashes password
    const hash = await bcrypt.hash(password, salt)

    //store in database alongside email
    const user = await this.create({email, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)