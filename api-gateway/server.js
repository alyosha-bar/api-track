// host /track endpoint
// Kafka producer goes here

// import dependencies
const { Kafka } = require('kafkajs');
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

// log pool errors instead of crashing
pool.on('error', (err) => {
  console.error('Unexpected Neon DB error:', err);
});

pool.connect()
    .then(() => console.log("Connected to Neon DB"))
    .catch(err => console.error("Neon DB connection error:", err.stack));

// configure Kafka producer
const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: [`${process.env.KAFKA_BROKER}:9092` || 'localhost:9092']
});

const producer = kafka.producer();

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
        const apiTokenResult = await pool.query(apiTokenQuery, [apiToken]);

        if (apiTokenResult.rows.length === 0) {
            console.log(`Invalid API token received: ${apiToken}`);
            return res.status(400).json({ message: "Invalid API token." });
        }
        const api_id = apiTokenResult.rows[0].id;
        
        console.log(`Tracking data received for API ID ${api_id}:`, { userId, apiUrl, method, status, responseTime, timestamp });

        console.log("Publishing tracking data to Kafka...");

        // publish to Kafka queue along with apiID
        publishMessage('tracking-data', JSON.stringify({
            userId, 
            apiId: api_id, 
            apiUrl, 
            method, 
            status, 
            responseTime, 
            timestamp
        }));



    } catch (err) {
        console.error("Error validating API token:", err);
        return res.status(500).send("Internal server error.");
    }

    res.status(200).send("Tracking data received.");


})

// kafka function
async function publishMessage(topic, message) {

    try {
        await producer.send({
            topic,
            messages: [{ value: message }],
        });
        console.log(`✅ Message published to ${topic}: ${message}`);
    } catch (err) {
        console.error("❌ Failed to publish message:", err);
    }
}


// quick test endpoint
app.get('/', (req, res) => {
    res.send("API Gateway is running.");
});


// Generic error handler for any unhandled exceptions in routes
app.use((err, req, res, next) => {
    console.error('Unhandled Exception:', err.stack); // Log the full stack trace
    // Check if the error was already handled (e.g., by express.json's verify)
    if (res.headersSent) {
        return next(err);
    }
    // If it's a custom error thrown by our verify or validation
    if (err.message === 'Invalid JSON payload' || err.message.includes('Bad Request')) {
        return res.status(400).json({ error: err.message });
    }
    // For all other unhandled errors, return a 500
    res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});


// run server
app.listen(PORT, async () => {
    await producer.connect();
    console.log(`API server running at port: ${PORT}`)
})
