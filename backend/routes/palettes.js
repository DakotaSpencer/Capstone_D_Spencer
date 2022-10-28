const express = require('express')
const {
    createPalette,
    getPalette,
    getPalettes,
    deletePalette,
    updatePalette
} = require('../controllers/paletteController')

const router = express.Router()

//GET all workouts
router.get('/', getPalettes)

//GET specific workout
router.get('/:id', getPalette)

//POST a new workout
router.post('/', createPalette)

//DELETE a Palette
router.delete('/:id', deletePalette)

//UPDATE a workout
router.patch('/:id', updatePalette)

module.exports = router