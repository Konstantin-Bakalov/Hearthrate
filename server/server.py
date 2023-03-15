from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SERVER_PORT, DB_SERVER, CARDS
import random

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

def get_random_number(not_this_one):
    number = random.randint(1, CARDS)

    if number == not_this_one:
        return get_random_number(not_this_one)
    
    return number

def get_two_random_numbers():
    first = random.randint(1, CARDS)
    second = get_random_number(first)

    return (first, second)

@app.get("/cards")
def get_cards():
    first, second = random.sample(range(1, int(CARDS) + 1), 2)

    first_card = Cards.query.get_or_404(first)
    second_card = Cards.query.get_or_404(second)

    data = {
       "firstCard": {
            "id": first_card.id,
            "image": first_card.image
       },
       "secondCard": {
            "id": second_card.id,
            "image": second_card.image
       }
    }

    return jsonify(data)

@app.post("/vote")
def create_vote():
    voted_for_id = request.json['votedForId']
    voted_against_id = request.json['votedAgainstId']
    
    vote = Votes(voted_for_id=voted_for_id, voted_against_id=voted_against_id)
    db.session.add(vote)
    db.session.commit()

    return jsonify({
        "voted_for_id": vote.voted_for_id,
        "voted_against_id": vote.voted_against_id
    })

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)