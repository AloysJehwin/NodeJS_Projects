require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for MySQL 8+
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
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

db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        return;
    }
    console.log('✅ MySQL Connected...');
});

// API to store carbon usage data
app.post('/addUsage', (req, res) => {
    const { date, usage } = req.body;
    const query = 'INSERT INTO carbon_usage (date, usages) VALUES (?, ?)';
    db.query(query, [date, usage], (err, result) => {
        if (err) {
            console.error('Insert Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Data added successfully' });
    });
});

// API to get total carbon usage
app.get('/getTotalUsage', (req, res) => {
    const query = 'SELECT SUM(usages) AS totalUsage FROM carbon_usage';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result[0]);
    });
});

// API to get all carbon usage entries
app.get('/getUsageData', (req, res) => {
    const query = 'SELECT * FROM carbon_usage ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
