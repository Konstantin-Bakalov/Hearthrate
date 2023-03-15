from datetime import datetime
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SERVER_PORT, DB_SERVER

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = DB_SERVER
db = SQLAlchemy(app)
app.app_context().push()

class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)

class Votes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    voted_for_id = db.Column(db.Integer, db.ForeignKey('cards.id'))
    voted_against_id = db.Column(db.Integer, db.ForeignKey('cards.id'))
    date_voted = db.Column(db.Date, default=datetime.utcnow)

@app.route("/")
def hello_world():
    return { 'message': 'hello' }

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)