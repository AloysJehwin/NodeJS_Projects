from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

# Dummy function to simulate prediction
def predict_heart_rate(heart_rate):
    return "High" if heart_rate > 100 else "Normal"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    if 'heart_rate' not in data:
        return jsonify({'error': 'Heart rate missing'}), 400
    
    try:
        heart_rate = float(data['heart_rate'])
        prediction = predict_heart_rate(heart_rate)
        return jsonify({'prediction': prediction})
    
    except ValueError:
        return jsonify({'error': 'Invalid heart rate value'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
