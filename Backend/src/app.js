const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoute')
const socialRoutes = require('./routes/socialRoutes')
const aiRoutes = require('./routes/aiRoutes')
const brandRoutes = require('./routes/brandRoutes')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/brand', brandRoutes)

// Health check
app.get('/', (req, res) => res.send('Postify AI Server is running'))

module.exports = app