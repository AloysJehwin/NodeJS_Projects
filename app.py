import os
import numpy as np
import pandas as pd
import pymysql
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)

# Function to fetch latest heart rate data from MySQL
def fetch_data_from_mysql():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    query = "SELECT heart_rate, label FROM heart_data ORDER BY id DESC LIMIT 500"  # Latest 500 data points
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# Function to generate and save the real-time heart rate graph
def generate_live_graph():
    data = fetch_data_from_mysql()
    plt.figure(figsize=(8, 5))
    plt.plot(data["heart_rate"], marker="o", linestyle="-", color="royalblue", label="Heart Rate")
    plt.xlabel("Record Number")
    plt.ylabel("Heart Rate")
    plt.title("Live Heart Rate Monitoring")
    plt.legend()
    plt.grid(True)
    plt.savefig("static/live_heart_rate.png")  # Save updated graph
    plt.close()

# Train the detection model
def train_model():
    data = fetch_data_from_mysql()
    
    # Prepare dataset
    X = data[["heart_rate"]]
    y = data["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale the data
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Logistic Regression model
    model = LogisticRegression()
    model.fit(X_train_scaled, y_train)
    
    # Model evaluation
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    return model, scaler, accuracy

# Train model and generate initial graph at startup
model, scaler, accuracy = train_model()
generate_live_graph()

# Home page route
@app.route("/")
def home():
    return render_template("index.html", accuracy=accuracy)

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        heart_rate_value = float(request.form["heart_rate"])
        scaled_value = scaler.transform([[heart_rate_value]])
        prediction = model.predict(scaled_value)[0]
        result = "Abnormal" if prediction == 1 else "Normal"
    except Exception as e:
        result = f"Error: {str(e)}"
    
    return render_template("index.html", accuracy=accuracy, result=result, input_value=heart_rate_value)

# API to serve live graph
@app.route("/update_graph")
def update_graph():
    generate_live_graph()
    return jsonify({"status": "success"})  # Response to trigger JS refresh

if __name__ == "__main__":
    app.run(debug=True, port=2500)
