# Import libraries
from turtle import pd
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import json 
import pickle

app = Flask(__name__)

# Load the model
model = pickle.load(open('finalized_model_2.pkl','rb'))
with open('encoder.pkl', 'rb') as handle:
    enc = pickle.load(handle)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request.
    #data = pd.read_json("data.json") #request.get_json(force=True)
    r = request.form
    data = pd.json_normalize(r)
    print(data)
    # data = pd.DataFrame(request.json)
    data = data.astype ({
                        "BedroomAbvGr": "int", 
                        "FullBath": "int", 
                        "LotArea": "int", 
                        "OverallQual": "int", 
                        "YearBuilt": "int"
                        })
   
    data = pd.concat([data.select_dtypes(exclude='object'),pd.DataFrame(enc.transform(data.select_dtypes('object')).toarray(),index=data.select_dtypes('object').index, columns=enc.get_feature_names().tolist())], axis =1)
    # # Make prediction using model loaded from disk as per the data.
    prediction = model.predict(data)

    # Take the first value of prediction
    output = prediction
    return jsonify({'Sales Price': list(output)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)



