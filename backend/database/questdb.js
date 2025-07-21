require('dotenv').config()
const { Pool } = require('pg')

const questPool = new Pool({
    host: process.env.QUEST_HOST,
    port: 8812,
    user: 'admin',
    password: 'quest',
    database: 'qdb'
})

// Set the client timezone to UTC
process.env.TZ = 'UTC';

module.exports = questPool