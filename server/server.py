from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SERVER_PORT, DB_SERVER

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = DB_SERVER
db = SQLAlchemy(app)
app.app_context().push()

@app.route("/")
def hello_world():
    return { 'message': 'hello' }

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)