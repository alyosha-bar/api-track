require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Optional: test DB connection once at startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        client.query('SELECT NOW()', (err, result) => {
        release();
        
        if (err) {
            console.error('Error executing test query', err.stack);
        } else {
            console.log('PostgreSQL connected at:', result.rows[0].now);
        }
        });
    }
});

module.exports = pool;
