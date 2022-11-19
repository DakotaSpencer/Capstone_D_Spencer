const Palette = require('../models/paletteModel')
const mongoose = require('mongoose')

//get all palettes/posts
const getPalettes = async (req, res) =>{
    const user_id = req.user._id
    //createdAt: -1 sorts all results by creation date in decending order
    const palettes = await Palette.find({user_id}).sort({createdAt: -1})

    res.status(200).json(palettes)
}


//get a single workout/post
const getPalette = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const palette = await Palette.findById(id)

    if(!palette){
        return res.status(400).json({error: 'No such palette exists with given ID: ' + id})
    }

    res.status(200).json(palette)
}


//create a new workout/post
const createPalette = async (req, res) => {
    const {title, colors} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!colors){
        emptyFields.push('colors')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //Add doc to DB
    try{
        const user_id = req.user._id
        const palette = await Palette.create({title, colors, user_id})
        res.status(200).json(palette)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a Palette/post
const deletePalette = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const palette = await Palette.findOneAndDelete({_id: id})

    if(!palette){
        return res.status(400).json({error: 'Palette with given ID cannot be deleted. It most likely does not exist.'})
    }

    res.status(200).json(palette)
}

//update a workout/post
const updatePalette = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const palette = await Palette.findOneAndUpdate({_id: id}, {
        //What we want to update (req.body is whatever arguments we want to update)
        //(Since its an object we are spreading it with ...)
        ...req.body
    })

    if(!palette){
        return res.status(400).json({error: 'Palette with given ID cannot be deleted. It most likely does not exist.'})
    }

    res.status(200).json(palette)
}

// Exports all the methods used here

module.exports = {
    getPalettes,
    getPalette,
    createPalette,
    deletePalette,
    updatePalette
}