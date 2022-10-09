const mongoose = require("mongoose");

const PaletteSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        //CONVERT PALETE TO IMAGE THEN SAVE, AND PUT PALETE IMAGE HERE
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Palette", PaletteSchema);