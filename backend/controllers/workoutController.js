const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts/posts
const getWorkouts = async (req, res) =>{
    //createdAt: -1 sorts all results by creation date in decending order
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


//get a single workout/post
const getWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error: 'No such workout exists with given ID: ' + id})
    }

    res.status(200).json(workout)
}


//create a new workout/post
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //Add doc to DB
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout/post
const deleteWorkout = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: 'Workout with given ID cannot be deleted. It most likely does not exist.'})
    }

    res.status(200).json(workout)
}

//update a workout/post
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID given'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        //What we want to update (req.body is whatever arguments we want to update)
        //(Since its an object we are spreading it with ...)
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'Workout with given ID cannot be deleted. It most likely does not exist.'})
    }

    res.status(200).json(workout)
}

// Exports all the methods used here

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}