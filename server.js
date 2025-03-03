require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2'); // MySQL library
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err.message);
        process.exit(1); // Exit if DB fails
    }
    console.log('✅ MySQL Connected...');
});

// ➤ API: Store Carbon Usage Data
app.post('/addUsage', (req, res) => {
    const { date, usage } = req.body;

    if (!date || isNaN(usage) || usage < 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const query = 'INSERT INTO carbon_usage (date, usages) VALUES (?, ?)';
    db.query(query, [date, usage], (err) => {
        if (err) {
            console.error('❌ Insert Error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: '✅ Data added successfully' });
    });
});

// ➤ API: Get Total Carbon Usage
app.get('/getTotalUsage', (req, res) => {
    const query = 'SELECT COALESCE(SUM(usages), 0) AS totalUsage FROM carbon_usage';
    db.query(query, (err, result) => {
        if (err) {
            console.error('❌ Query Error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result[0]);
    });
});

// ➤ API: Get All Carbon Usage Entries
app.get('/getUsageData', (req, res) => {
    const query = 'SELECT * FROM carbon_usage ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Query Error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// ➤ API: Fetch Data from Raspberry Pi and Store in MySQL
app.get('/fetchPiData', async (req, res) => {
    try {
        const raspberryPiURL = process.env.NGROK_URL || 'https://random-id.ngrok.io'; 
        const response = await axios.get(`${raspberryPiURL}/getSensorData`);

        if (!response.data || typeof response.data.sensor_value !== 'number') {
            return res.status(500).json({ error: 'Invalid sensor data' });
        }

        const { sensor_value } = response.data;
        const query = 'INSERT INTO carbon_usage (date, usages) VALUES (NOW(), ?)';
        db.query(query, [sensor_value], (err) => {
            if (err) {
                console.error('❌ Insert Error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: '✅ Data fetched and stored successfully', sensor_value });
        });

    } catch (error) {
        console.error('❌ Error fetching data from Raspberry Pi:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Raspberry Pi' });
    }
});

// ➤ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
