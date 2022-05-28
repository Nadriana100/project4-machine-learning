from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
  

@app.route('/')
def hello():
    return "Hi"

if __name__ == "__main__":
    print("Starting Python Flask Server for House Pricing Prediction")
    app.run()
