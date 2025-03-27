# QR Code Generator

This is a **QR Code Generator** built using **Node.js**, **Express.js**, **EJS**, and **MySQL**. The application allows users to generate QR codes for any given URL and download them.

---
## **Features**
- Generate QR codes from URLs
- Store QR code data in MySQL database
- View and download QR codes
- Simple and attractive UI with **EJS & CSS**

---
## **Project Structure**
```
qr_generator/
├── src/
│   ├── routes/
│   │   ├── qrRoutes.js  # Routes for QR code handling
│   ├── views/
│   │   ├── index.ejs    # Main frontend page
│   ├── public/
│   │   ├── css/
│   │   │   ├── style.css  # CSS file for styling
│   ├── uploads/         # Folder to store QR images
│   ├── db.js            # Database connection setup
│   ├── server.js        # Main server file
├── .env                 # Environment variables
├── package.json         # Project dependencies
├── README.md            # Project documentation
```

---
## **Prerequisites**
Make sure you have **Node.js** and **MySQL** installed.
- Node.js: [Download Node.js](https://nodejs.org/)
- MySQL: [Download MySQL](https://dev.mysql.com/downloads/)

---
## **Installation**
### **1️ Clone the Repository**
```sh
git clone --branch qr_generator --single-branch https://github.com/AloysJehwin/NodeJS_Projects
cd NodeJS_Projects
```

### **2️ Install Dependencies**
```sh
npm install
```

### **3️ Setup Environment Variables**
Create a `.env` file in the root directory and add your MySQL credentials:
```sh
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=qr_database
PORT=3000
```

### **4️ Database Setup**
Run the following SQL query to create the database and table:
```sql
CREATE DATABASE qr_database;
USE qr_database;

CREATE TABLE qr_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    qr_image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **5️ Start the Server**
```sh
npm start
```
The server will start on: **[http://localhost:3000](http://localhost:3000)**

---
## **Usage**
1. Open **http://localhost:3000** in your browser.
2. Enter a URL in the input field and click **Generate**.
3. The QR code will be displayed with a **Download** option.
4. Click **Restart** to reset the page.

---
## **Built With**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **EJS** - Template engine for rendering views
- **MySQL2** - MySQL database for storing QR data
- **qrcode** - Library for generating QR codes

---
## **Contributing**
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---
## **License**
This project is open-source and available under the **MIT License**.

---
## **Contact**
For any issues, contact **Aloys Jehwin** via [GitHub](https://github.com/aloysjehwin) or visit [aloysjehwin.com](https://aloysjehwin.vercel.com).

