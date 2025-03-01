import pymysql
import numpy as np
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_CHARSET = os.getenv("DB_CHARSET")

# Function to create table if not exists
def create_table():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, charset=DB_CHARSET)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS heart_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            heart_rate INT,
            label INT
        )
    """)
    conn.commit()
    conn.close()
    print("✅ Table created successfully (if not exists).")

# Function to insert 500 random data points
def insert_random_data(n_samples=500):
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, charset=DB_CHARSET)
    cursor = conn.cursor()

    # Generate random heart rate values
    np.random.seed(42)
    heart_rates = np.random.randint(50, 150, size=n_samples)
    labels = np.where((heart_rates < 60) | (heart_rates > 100), 1, 0)  # 1: Abnormal, 0: Normal

    # Insert data into MySQL
    data = list(zip(heart_rates, labels))
    query = "INSERT INTO heart_data (heart_rate, label) VALUES (%s, %s)"
    cursor.executemany(query, data)
    conn.commit()
    conn.close()

    print(f"✅ Successfully inserted {n_samples} random records.")

# Function to fetch and display data
def fetch_data():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, charset=DB_CHARSET)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM heart_data LIMIT 10")  # Fetch only 10 rows to display
    rows = cursor.fetchall()
    conn.close()

    print("\nID | Heart Rate | Label")
    print("-" * 25)
    for row in rows:
        print(f"{row[0]}  | {row[1]}       | {row[2]}")
    print()

if __name__ == "__main__":
    create_table()  
    insert_random_data(500)  # Insert 500 random records
    fetch_data()  # Display first 10 records
