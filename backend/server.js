require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const paletteRoutes = require('./routes/palettes')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next)=>{
    console.log("Process: " + req.method, ", on Port: " + process.env.PORT, ", through Route: " + req.path)
    next()
})

// routes
app.use('/api/palettes',paletteRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log("\nBackend Server Connected to MONGODB & Listening on PORT", process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

