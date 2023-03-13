from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SERVER_PORT, DB_SERVER

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = DB_SERVER
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)

    def __init__(self, name, email):
        self.name = name
        self.email = email

@app.route("/")
def hello_world():
    return { 'message': 'hello' }

if __name__ == '__main__':
    db.create_all()
    app.run(host='localhost', port=SERVER_PORT, debug=True)