const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoute')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/', (req, res) => res.send('✅ Postify AI Server is running'))

module.exports = app