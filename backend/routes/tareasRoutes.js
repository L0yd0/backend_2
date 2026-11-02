const express = require('express')
const router = express.Router()
const {getTareas, createTareas, updateTareas, deleteTareas} = require('../controllers/tareasControllers')
const protected = require('../middleware/authMiddleware')

router.get('/', protected, getTareas)
router.post('/',protected, createTareas)
router.put('/:id',protected, updateTareas)
router.delete('/:id',protected, deleteTareas)

module.exports = router