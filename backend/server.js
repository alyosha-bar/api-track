const express = require('express')
const cors = require("cors")
const app = express()
const authRoutes = require('./modules/auth/auth.routes')
const apiRoutes = require('./modules/apis/apis.routes')

const pool = require("./database/db")
const questPool = require("./database/questdb")

app.use(express.json())

app.use(cors({
  origin: [
    "https://aware-perfection-production.up.railway.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length"],
  credentials: true,
  maxAge: 43200 
}));

// grouped routes
app.use('/api/auth', authRoutes)

// PROTECT THESE
app.use('/api/core', apiRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})