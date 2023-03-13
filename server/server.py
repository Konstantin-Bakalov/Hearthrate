from flask import Flask
from flask_cors import CORS
from config import SERVER_PORT

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return { 'message': 'hello' }

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)