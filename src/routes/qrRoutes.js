const express = require("express");
const QRCode = require("qrcode");
const db = require("../database/db");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ Ensure "uploads" folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Homepage
router.get("/", (req, res) => {
  res.render("index", { qrImage: null, link: null });
});

// ✅ Generate QR Code & Store in "uploads/"
router.post("/generate", async (req, res) => {
  const { link } = req.body;
  if (!link) {
    return res.redirect("/");
  }

  try {
    const fileName = `qr_${Date.now()}.png`;
    const qrPath = path.join(uploadsDir, fileName); // ✅ Absolute path for saving
    const qrPublicPath = `/uploads/${fileName}`; // ✅ This will be used in HTML

    // ✅ Generate QR Code & Save
    await QRCode.toFile(qrPath, link);

    // ✅ Save in database
    db.query("INSERT INTO qr_data (link, qr_image) VALUES (?, ?)", [link, qrPublicPath], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.send("Error saving QR code to database.");
      }

      // ✅ Pass the public path (relative URL) to the frontend
      res.render("index", { qrImage: qrPublicPath, link });
    });

  } catch (error) {
    console.error("QR Code generation error:", error);
    res.send("Error generating QR Code");
  }
});

// Restart Route
router.get("/restart", (req, res) => {
  res.redirect("/");
});

module.exports = router;
