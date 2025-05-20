from flask import Flask, jsonify, request
# from flask_cors import CORS
import os
import pymysql
from dotenv import load_dotenv
import mysql.connector
from flask_cors import CORS
from werkzeug.utils import secure_filename

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'mp3-files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# CORS(app)



# @app.route("/api/empresas", methods=["GET"])
# def get_empresas():
#     cursor.execute("SELECT * FROM Empresa")
#     result = cursor.fetchall()
#     return jsonify(result)

@app.route('/api/uploadfiles', methods=['POST'])
def upload_files():
    restrito = request.form.get('restrito') 
    files = request.files.getlist('files')  
    saved_files = []
    for f in files:
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        saved_files.append(filename)
    
    return jsonify({"message": f"{len(files)} arquivo(s) recebidos", "arquivos": saved_files})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
    