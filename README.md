# Hearthrate

Website for rating classic Hearthstone cards.

## Live Demo

[hearthrate.click](https://hearthrate.click/)

## Features

- Responsive design
- Infinite scroll
- Votes for and against for each card shown
- Results ordered by votes
- 382 cards to choose from

## Tech Stack

**Client:** React, Vite, Tailwind CSS, Typescript, React Query

**Server:** PostgreSQL, Python, Flask, Flask-SQLAlchemy, Gunicorn, Nginx

**Others:** Prettier, ESLint

## Deployment on AWS

The client is deployed on an EC2 instance with a SSL certificate. The server runs on CloudFront. Images are stored in S3.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Client:**

`VITE_APP_SERVER_URL`

**Server:**

`DB_SERVER`, `SERVER_PORT`

## Installation

Install using npm

```bash
  cd client && npm i
  npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
  cd server
  python3 -m venv venv
  . venv/bin/activate
  pip install -r requirements.txt
```

Install all requirements.

```bash
  python3
  from sever import db
  db.create_all()
```

Open a python REPL, import db and create all models in the database.
Remember to create a database and set env variables beforehand.

```bash
  python3 server.py
```

Start the server.
