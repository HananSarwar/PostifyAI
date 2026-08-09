const express = require('express')
const router = express.Router()
const { saveBrand, getBrand, updateBrand } = require('../controllers/brandController')
const { protect } = require('../middleware/authMiddleware')

router.post('/save', protect, saveBrand)
router.get('/get', protect, getBrand)
router.put('/update', protect, updateBrand)

module.exports = router