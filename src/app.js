require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const faker = require("faker");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Set EJS as the templating engine
app.set("view engine", "ejs");

// ✅ Fix public folder path since `server.js` is inside `src`
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.urlencoded({ extended: true }));

// ✅ Fix views folder path
app.set("views", path.join(__dirname, "..", "views"));

// MySQL Database Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET
};

// Create MySQL Connection
const connection = mysql.createConnection(dbConfig);

// Function to create the table if it doesn't exist
function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS heart_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            heart_rate INT,
            label INT
        )
    `;
    connection.query(query, (err) => {
        if (err) throw err;
        console.log("✅ Table created successfully (if not exists).");
    });
}

// Function to insert 500 random data points
function insertRandomData(n_samples = 500) {
    let data = [];
    for (let i = 0; i < n_samples; i++) {
        let heart_rate = faker.datatype.number({ min: 50, max: 150 });
        let label = (heart_rate < 60 || heart_rate > 100) ? 1 : 0; // 1: Abnormal, 0: Normal
        data.push([heart_rate, label]);
    }

    const query = "INSERT INTO heart_data (heart_rate, label) VALUES ?";
    connection.query(query, [data], (err) => {
        if (err) throw err;
        console.log(`✅ Successfully inserted ${n_samples} random records.`);
    });
}

// Home Route - Fetch Data & Render Web Page
app.get("/", (req, res) => {
    const query = "SELECT * FROM heart_data LIMIT 10";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.render("index", { data: rows, result: null }); // Pass data to EJS
    });
});

// Predict Route - Calls Python API
app.post("/predict", async (req, res) => {
    const heartRate = req.body.heartRate;

    try {
        const response = await axios.post("http://localhost:5000/predict", { heart_rate: heartRate });
        const prediction = response.data.prediction;
        
        // Fetch latest heart rate data
        connection.query("SELECT * FROM heart_data LIMIT 10", (err, rows) => {
            if (err) throw err;
            res.render("index", { data: rows, result: prediction });
        });

    } catch (error) {
        res.render("index", { data: [], result: "Error fetching prediction" });
    }
});

// Run the MySQL setup functions
connection.connect((err) => {
    if (err) throw err;
    console.log("✅ Connected to MySQL database.");
    // createTable();
    // insertRandomData(500); // Insert 500 random records
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
