# Import libraries
# from turtle import pd
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
#INDEX HTML
@app.route('/')
def index():
    return render_template('index.html')

# DATA VISUALIZATIONS HTML
@app.route('/data_visualization.html')
def data_visualizations():
    return render_template('data_visualization.html')

# correlations HTML
@app.route('/correlations.html')
def correlations():
    return render_template('correlations.html')

# prediction HTML
@app.route('/prediction.html')
def predictions():
    return render_template('prediction.html')


@app.route('/predict.html', methods=['POST'])
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
    # output = prediction
    # return jsonify({'Sales Price': list(output)})
        # Take the first value of prediction
    output = int(prediction)
    return render_template('predict.html', posts= output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)



