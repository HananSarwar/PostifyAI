const express = require('express')
const router = express.Router()
const {
  linkedinAuth,
  linkedinCallback,
  getConnectedAccounts,
  disconnectAccount,
} = require('../controllers/socialController')
const { protect } = require('../middleware/authMiddleware')

// LinkedIn OAuth — no protect middleware, token comes via query param
router.get('/linkedin', linkedinAuth)
router.get('/linkedin/callback', linkedinCallback)

// Connected accounts
router.get('/accounts', protect, getConnectedAccounts)
router.delete('/disconnect/:platform', protect, disconnectAccount)

module.exports = router