const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paletteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    colors:{
        type:Array,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('Palette', paletteSchema)