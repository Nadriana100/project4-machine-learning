# Import libraries
from turtle import pd
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import json 
import pickle

app = Flask(__name__)

# Load the model
model = pickle.load(open('finalized_model_2.pkl','rb'))
with open('encoder.pkl', 'rb') as handle:
    enc = pickle.load(handle)
@app.route('/predict')
def predict():
    # Get the data from the POST request.
    data = pd.read_json("data.json") #request.get_json(force=True)
    data = pd.concat([data.select_dtypes(exclude='object'),pd.DataFrame(enc.transform(data.select_dtypes('object')).toarray(),index=data.select_dtypes('object').index, columns=enc.get_feature_names().tolist())], axis =1)
    # Make prediction using model loaded from disk as per the data.
    prediction = model.predict(data.drop(columns="SalePrice"))

    # Take the first value of prediction
    output = prediction
    return jsonify({'Sales Price': list(output)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

