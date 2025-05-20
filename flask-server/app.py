from flask import Flask, jsonify, request
# from flask_cors import CORS
import os
import pymysql
from dotenv import load_dotenv
import mysql.connector

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

def connect_to_mysql():
    db = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        passwd="root",
        database="audioScript"
    )
    cursor = db.cursor()
    return cursor, db

# cursor, db =connect_to_aws_rds()
cursor, db = connect_to_mysql()


@app.route("/api/empresas", methods=["GET"])
def get_empresas():
    cursor.execute("SELECT * FROM Empresa")
    result = cursor.fetchall()
    return jsonify(result)

@app.route('/api/upload', methods=['POST'])
def upload_files():
    restrito = request.form.get('restrito')  # "sim" ou "nao"
    files = request.files.getlist('files')   # nome "files" deve bater com o FormData

    for f in files:
        print(f.filename)
        # Aqui você pode salvar o arquivo: f.save(f"./uploads/{f.filename}")
    
    return jsonify({"message": f"{len(files)} arquivo(s) recebidos", "restrito": restrito})

