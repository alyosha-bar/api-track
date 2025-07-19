const express = require('express')
const app = express()
const authRoutes = require('./modules/auth/auth.routes')

const pool = require("./database/db")

app.use(express.json())

// grouped routes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})