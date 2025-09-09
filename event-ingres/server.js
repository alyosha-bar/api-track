// RabbitMQ consumer goes here
const express = require("express");
const { Pool } = require('pg');
const amqp = require('amqplib');
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

const rabbitmq_uri = process.env.RABBITMQ_URI || 'amqp://user:password@localhost:5672/';
const queue = 'tracking_data';

// Consume messages from RabbitMQ and insert into QuestDB
async function startConsumer() {
  try {
    const connection = await amqp.connect(rabbitmq_uri);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });

    console.log(`✅ Waiting for messages in queue: "${queue}"`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        try {
          const messageContent = msg.content.toString();
          const trackingData = JSON.parse(messageContent);

          console.log("📥 Received:", trackingData);

          // Insert into QuestDB (make sure you have a table with these columns!)
          await pool.query(
            `INSERT INTO api_traffic_log (api_id, user_id, timestamp, method, status, response_time_ms)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              trackingData.api_id,
              trackingData.userId,
              trackingData.timestamp,
              trackingData.method,
              trackingData.status,
              trackingData.responseTime,
              
            ]
          );

          console.log("✅ Inserted into QuestDB");

          channel.ack(msg);
        } catch (err) {
          console.error("❌ Error processing message:", err);
          channel.nack(msg, false, false); // reject and discard bad messages
        }
      }
    });
  } catch (err) {
    console.error("❌ Failed to start consumer:", err);
    process.exit(1);
  }
}


// rabbit mq connection logic goes here
// take in messages from rabbitmq and insert into questdb

// Basic Express endpoint
app.get("/", (req, res) => {
  res.send("Rabbit MQ Consumer is running...");
});

app.listen(port, async () => {
  console.log(`🚀 Express server running at http://localhost:${port}`);
  await startConsumer();
});
