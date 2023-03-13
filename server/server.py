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

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)

    def __init__(self, text, author):
        self.text = text
        self.author = author

@app.route("/")
def hello_world():
    return { 'message': 'hello' }

@app.post('/')
def create_quote():
    quote = request.json['quote']
    author = request.json['author']
    
    db.session.add(Quote(quote, author))
    db.session.commit()

    return { 'quote': quote, 'author': author }

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)