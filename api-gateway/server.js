// host /track endpoint
// Kafka producer goes here

// import dependencies
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

// create app
const app = express();
const PORT = process.env.PORT || 3000;

// connect to Neon DB
const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { 
        rejectUnauthorized: false 
    }
})

pool.connect()
    .then(() => console.log("Connected to Neon DB"))
    .catch(err => console.error("Neon DB connection error:", err.stack));

// configure Kafka producer


// configure middleware
app.use(cors());
app.use(express.json());

// /track endpoint
app.post('/track', async (req, res) => {
    // Extract tracking data from request body
    const { userId, apiToken, apiUrl, method, status, responseTime, timestamp } = req.body;
    
    // Validate essential fields
    if (!userId || !apiToken || !apiUrl || !status || !responseTime || !timestamp) {
        console.error("Missing required tracking data fields.");
        return res.status(400).send("Missing required tracking data fields.");
    }

    // validate apiToken and find apiID
    try {
        const apiTokenQuery = "SELECT id FROM apis WHERE api_token = $1";
        const apiTokenResult = await neonPool.query(apiTokenQuery, [apiToken]);

        if (apiTokenResult.rows.length === 0) {
            console.log(`Invalid API token received: ${apiToken}`);
            return res.status(400).json({ message: "Invalid API token." });
        }
        const api_id = apiTokenResult.rows[0].id;
        
        // publish to Kafka queue along with apiID
        



    } catch (err) {
        console.error("Error validating API token:", err);
        return res.status(500).send("Internal server error.");
    }



})

// quick test endpoint
app.get('/', (req, res) => {
    res.send("API Gateway is running.");
});


// run server
app.listen(PORT, () => {
    console.log(`API server running at port: ${PORT}`)
})
