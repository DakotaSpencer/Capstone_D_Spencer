const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled before creating an acocunt.')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password must be at least 8 characters and have an Uppercase letter, a lowercase letter, a number and a symbol')
    }

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

//static login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled before logging in.')
    }

    const user = await this.findOne({email})

    if (!user){
        throw Error('Email or password is incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Email or password is incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)