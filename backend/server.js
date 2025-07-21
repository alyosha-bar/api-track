const express = require('express')
const app = express()
const authRoutes = require('./modules/auth/auth.routes')
const apiRoutes = require('./modules/apis/apis.routes')

const pool = require("./database/db")
const questPool = require("./database/questdb")

app.use(express.json())

// grouped routes
app.use('/api/auth', authRoutes)

// PROTECT THESE
app.use('/api/core', apiRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})