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
