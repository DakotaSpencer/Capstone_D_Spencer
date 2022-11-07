const express = require('express')
const {
    createPalette,
    getPalette,
    getPalettes,
    deletePalette,
    updatePalette
} = require('../controllers/paletteController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)
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