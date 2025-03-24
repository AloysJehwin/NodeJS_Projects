require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

// ✅ Ensure "uploads" directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"))); // Serve CSS, JS
app.use("/uploads", express.static(uploadsDir)); // ✅ Serve uploaded QR images

// ✅ Set view engine
app.use("/public", express.static(path.join(__dirname, "../public"))); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// ✅ Use the router
app.use("/", qrRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
