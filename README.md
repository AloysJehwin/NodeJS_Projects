# Heart Rate Prediction System

This project is a **Heart Rate Prediction System** using **Node.js, Express, MySQL, and EJS**. It fetches heart rate data from a MySQL database and allows users to predict heart health status using a **Python-based API**.

## 🚀 Features
- Stores heart rate data in a MySQL database.
- Uses **EJS** for rendering dynamic web pages.
- Fetches and displays heart rate records.
- Calls a Python API (`/predict`) to predict heart health.
- Supports styling with CSS (stored in `/public`).

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone --branch Heart_Rate_Analyser --single-branch https://github.com/AloysJehwin/NodeJS_Projects
cd NodeJS_Projects
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the root directory and configure your MySQL details:
```ini
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_CHARSET=utf8mb4
```

### 4️⃣ Start the MySQL Database
Ensure MySQL is running and execute the following SQL command to create the database:
```sql
CREATE DATABASE your_database;
USE your_database;
```

### 5️⃣ Run the Server
```sh
npm start
```
Your Express server will start at: `http://localhost:3000`

### 6️⃣ Start the Python API (Flask Server)
The prediction API runs separately using Python (Flask). Ensure it's running at:
```sh
http://localhost:5000/predict
```

---

## 📌 Folder Structure
```
/project-root
  ├── /public          # CSS, JS, images
  ├── /views           # EJS templates
  ├── /src             # Server files
  │    ├── app.js   # Main Express server
  ├── .env             # Environment variables
  ├── package.json     # Project dependencies
```

---

## 🎯 Usage
1. **Home Page (`/`)**
   - Displays stored heart rate data.
   - Users can enter a heart rate value for prediction.
2. **Prediction (`/predict`)**
   - Calls the Python API to determine if the heart rate is normal or abnormal.
3. **Styling & Static Files**
   - The styles and assets are inside the `public` folder.

---

## 🛠️ Troubleshooting
- **Database Connection Issue:** Ensure MySQL is running and `.env` has the correct credentials.
- **Python API Not Working:** Ensure the Flask server is running at `http://localhost:5000/predict`.
- **CSS Not Loading:** Check if the `public` folder is correctly referenced in `server.js`.

---

## 🤝 Contributing
Feel free to fork this repository and submit pull requests! 🎉

---

## 📜 License
This project is open-source and available under the **MIT License**.

