const express = require('express')
const router = express.Router()
const {
  generateCaption,
  generateHashtags,
  optimizeTone,
  getHistory,
} = require('../controllers/aiController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate-caption', protect, generateCaption)
router.post('/generate-hashtags', protect, generateHashtags)
router.post('/optimize-tone', protect, optimizeTone)
router.get('/history', protect, getHistory)

module.exports = router