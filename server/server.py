from flask import Flask, jsonify
from json import load 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

STATE_FILE = "./state.json"
@app.route("/state")
def get_state():
	f = open(STATE_FILE)
	data = load(f)
	f.close()

	return jsonify(data)


app.run(host='0.0.0.0', port=8080)
