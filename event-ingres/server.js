// Kafka consumer goes here
const express = require("express");
const { Kafka } = require("kafkajs");
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 4000;

// Set up QuestDB connection here
const pool = new Pool({
    host: process.env.QUEST_HOST,
    port: 8812,
    user: 'admin',
    password: 'quest',
    database: 'qdb'
})

// Configure Kafka client
const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: [`${process.env.KAFKA_BROKER}:9092` || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: "test-group" });

// Function to start consumer
async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "tracking-data", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const client = await pool.connect();

      try {
        // Parse Kafka message payload
        const payload = JSON.parse(message.value.toString());

        const insertQuery = `
          INSERT INTO api_traffic_log (api_id, user_id, timestamp, method, status, response_time_ms)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;

        // Use timestamp from payload (not Kafka internal timestamp)
        const timestampObj = new Date(payload.timestamp);

        const numericStatus = parseInt(payload.status, 10);
        const numericResponseTime = parseInt(payload.responseTime, 10);

        await client.query(insertQuery, [
          payload.apiId,
          payload.userId,
          timestampObj,
          payload.method,
          numericStatus,
          numericResponseTime
        ]);

        console.log(`✅ Inserted tracking data for API ID ${payload.apiId}`);
        console.log(`📩 Raw message: ${message.value.toString()}`);
        console.log(payload);
      } catch (err) {
        console.error("❌ Error processing message:", err);
      } finally {
        client.release();
      }
    },
  });
}

// Start consumer
startConsumer().catch(console.error);

// Basic Express endpoint
app.get("/", (req, res) => {
  res.send("Kafka Consumer is running...");
});

app.listen(port, () => {
  console.log(`🚀 Express server running at http://localhost:${port}`);
});
