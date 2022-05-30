from urllib import response
from flask import Flask, request, jsonify, render_template
import util

app = Flask(__name__)
  

@app.route('/neighborhood_price')
def neighborhood_price():
    response = jsonify({
        "Neighborhood" : util.neighborhood_price()
    })
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response 

if __name__ == "__main__":
    print("Starting Python Flask Server for House Pricing Prediction")
    app.run()
