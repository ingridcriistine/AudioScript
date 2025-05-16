from flask import Flask, jsonify
# from flask_cors import CORS
import os
import pymysql
from dotenv import load_dotenv

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

app = Flask(__name__)
# CORS(app)

#BD
def connect_to_aws_rds():
    db = pymysql.connect(
        host=HOST, 
        user=USER, 
        password=PASSWORD
        )
    cursor = db.cursor()
    return cursor, db

cursor, db =connect_to_aws_rds()

print(cursor.connection)

if __name__ == '__main__':
    app.run(debug=True)
