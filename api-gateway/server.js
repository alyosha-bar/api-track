// host /track endpoint
// RabbitMQ producer goes here

// import dependencies
const express = require('express');
const { Pool } = require('pg');
const amqp = require('amqplib');
const cors = require('cors');
require('dotenv').config();

// create app
const app = express();
const PORT = process.env.PORT || 3000;


// connect to rabbitmq
const rabbitmq_uri = process.env.RABBITMQ_URI || 'amqp://user:password@localhost:5672/';
const queue = 'tracking_data';

console.log(rabbitmq_uri)

let channel;

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(rabbitmq_uri);
        channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        console.log("Connected to RabbitMQ");

        // Handle app shutdown gracefully
        process.on('SIGINT', async () => {
        console.log('Closing RabbitMQ connection...');
        await channel.close();
        await connection.close();
        process.exit(0);
        });
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        process.exit(1);
    }
}

console.log('NEON_DATABASE_URL from environment:', process.env.NEON_DATABASE_URL);

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

        console.log("Publishing tracking data to RabbitMQ...");

        // RABBITMQ PUBLISHING LOGIC HERE
        const trackingData = {
            userId,
            api_id: api_id,
            apiUrl,
            method,
            status,
            responseTime,
            timestamp
        }

        const msg = "TEST MESSAGE"
        await sendMessage(trackingData);
        // res.send(`Message sent: ${msg}`);


    } catch (err) {
        console.error("Error validating API token:", err);
        return res.status(500).send("Internal server error.");
    }

    res.status(200).send("Tracking data received.");


})


// send function
async function sendMessage(data) {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }
  const msgBuffer = Buffer.from(JSON.stringify(data));
  channel.sendToQueue(queue, msgBuffer);
  console.log(`📤 Sent: ${JSON.stringify(data)}`);
}

// quick test endpoint
app.get('/', (req, res) => {
    res.send("API Gateway is running.");
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Exception:', err.stack);
    if (res.headersSent) {
        return next(err);
    }
    

    if (err.message === 'Invalid JSON payload' || err.message.includes('Bad Request')) {
        return res.status(400).json({ error: err.message });
    }
    

    res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});


// run server
app.listen(PORT, async () => {
    await connectRabbitMQ();
    console.log(`API server running at port: ${PORT}`)
})
