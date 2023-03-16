from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from config import SERVER_PORT, DB_SERVER
import random

CARDS=382

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

@app.get("/results")
def get_results():
    query_vote_for = db.session.\
                            query(Cards.id, db.func.count(Votes.voted_for_id)\
                            .label('voted_for'))\
                            .outerjoin(Votes, Cards.id == Votes.voted_for_id)\
                            .group_by(Cards.id).subquery()
    
    query_vote_against = db.session.\
                            query(Cards.id, db.func.count(Votes.voted_against_id)\
                            .label('voted_against'))\
                            .outerjoin(Votes, Cards.id == Votes.voted_against_id)\
                            .group_by(Cards.id).subquery()
    
    result = db.session.query(Cards.id, text('voted_for'), text('voted_against'))\
                            .join(query_vote_for, Cards.id == query_vote_for.c.id)\
                            .join(query_vote_against, Cards.id == query_vote_against.c.id).all()

    return { 'message': 'success'}

if __name__ == '__main__':
    app.run(host='localhost', port=SERVER_PORT, debug=True)