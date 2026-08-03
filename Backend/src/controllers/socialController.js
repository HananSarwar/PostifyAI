const axios = require('axios')
const jwt = require('jsonwebtoken')
const linkedinConfig = require('../config/linkedin')
const SocialAccount = require('../models/socialModel')

// Step 1: Redirect user to LinkedIn login
const linkedinAuth = (req, res) => {
  const token = req.query.token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: linkedinConfig.clientId,
    redirect_uri: linkedinConfig.redirectUri,
    scope: linkedinConfig.scope.join(' '),
    state: token,
  })

  const authUrl = `${linkedinConfig.authUrl}?${params.toString()}`
  res.redirect(authUrl)
}

// Step 2: Handle LinkedIn callback
const linkedinCallback = async (req, res) => {
  const { code, state } = req.query
  const token = state

  // Verify token and get userId
  let userId
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    userId = decoded.id
  } catch (err) {
    return res.redirect(`${process.env.FRONTEND_URL}/connected?platform=linkedin&status=error`)
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      linkedinConfig.tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: linkedinConfig.redirectUri,
        client_id: linkedinConfig.clientId,
        client_secret: linkedinConfig.clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    const { access_token, expires_in } = tokenResponse.data

    // Get LinkedIn profile
    const profileResponse = await axios.get(linkedinConfig.profileUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const profile = profileResponse.data

    // Save or update in DB
    await SocialAccount.findOneAndUpdate(
      { userId, platform: 'linkedin' },
      {
        userId,
        platform: 'linkedin',
        platformUserId: profile.sub,
        name: profile.name,
        email: profile.email,
        profilePicture: profile.picture || '',
        accessToken: access_token,
        tokenExpiry: new Date(Date.now() + expires_in * 1000),
        isConnected: true,
      },
      { upsert: true, new: true }
    )

    res.redirect(`${process.env.FRONTEND_URL}/connected?platform=linkedin&status=success`)
  } catch (err) {
    console.error('LinkedIn callback error:', err.message)
    res.redirect(`${process.env.FRONTEND_URL}/connected?platform=linkedin&status=error`)
  }
}

// Get all connected accounts for logged in user
const getConnectedAccounts = async (req, res) => {
  try {
    const accounts = await SocialAccount.find({
      userId: req.user._id,
      isConnected: true,
    }).select('-accessToken -refreshToken')

    res.status(200).json({ accounts })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Disconnect an account
const disconnectAccount = async (req, res) => {
  const { platform } = req.params
  try {
    await SocialAccount.findOneAndUpdate(
      { userId: req.user._id, platform },
      { isConnected: false }
    )
    res.status(200).json({ message: `${platform} disconnected successfully` })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = {
  linkedinAuth,
  linkedinCallback,
  getConnectedAccounts,
  disconnectAccount,
}