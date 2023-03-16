from dotenv import load_dotenv
import os

load_dotenv()

SERVER_PORT = os.getenv('SERVER_PORT')

DB_SERVER = os.getenv('DB_SERVER')