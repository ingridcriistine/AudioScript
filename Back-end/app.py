from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.utils import secure_filename
from Conversor.main import transform_mp4_to_mp3
from Database.conection import connect_to_mysql
from CreatePdf.main import create_pdf
from AwsS3Operations.main import upload_file, download_file, delete_file
from Transcription.main import transcribe_audio

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'mp3-files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# @app.route("/api/empresas", methods=["GET"])
# def get_empresas():
#     cursor.execute("SELECT * FROM Empresa")
#     result = cursor.fetchall()
#     return jsonify(result)

@app.route('/api/uploadfiles', methods=['POST'])
def upload_files():
    restrito = request.form.get('restrito') 
    user_file_name = request.form.get('user-file-name')
    files = request.files.getlist('files')  
    saved_files = []
    for f in files:
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        saved_files.append(filename)

    
    
    return jsonify({"message": f"{len(files)} arquivo(s) recebidos", "arquivos": saved_files, "restrito": restrito, "file_name": user_file_name})



if __name__ == "__main__":
    app.run(debug=True, port=5000)
    