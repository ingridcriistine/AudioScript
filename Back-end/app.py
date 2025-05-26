from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from Conversor.main import transform_mp4_to_mp3
from Database.conection import connect_to_mysql, insert_file_into_mysql
from CreatePdf.main import create_pdf
from AwsS3Operations.main import upload_file_to_s3, download_file_from_s3, delete_file_from_s3
from Transcription.main import transcribe_audio
from datetime import datetime

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")
UPLOAD_FOLDER = 'mp3-files'
MP3_FOLDER_PATH = f'{UPLOAD_FOLDER}/'
AWS_BUCKET = 'audioscript-s3-bucket'

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/uploadfiles', methods=['POST'])
def upload_files():
    restrito = request.form.get('restrito') 
    user_file_name = request.form.get('user-file-name')
    files = request.files.getlist('files')  
    for f in files:
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        print(f'file saved on /{UPLOAD_FOLDER}/{f.filename}')

    today = datetime.now()
    date = str(today.date())
    time = str(today.time())
    mp3_files = os.listdir(MP3_FOLDER_PATH)
    all_transcriptions = []
    for file in mp3_files:
        timestamp = f'{date}_{time}' 
        transcription = transcribe_audio(f'{MP3_FOLDER_PATH}/{file}')
        all_transcriptions.append(transcription)
    
    pdf_transcription_file = create_pdf(all_transcriptions, f'{user_file_name}-{timestamp}')
    upload_file_to_s3(pdf_transcription_file, AWS_BUCKET, pdf_transcription_file)
    cnx = connect_to_mysql()
    insert_file_into_mysql(cnx, f'{user_file_name}-{timestamp}', date, 1, 1)
    return jsonify({"message": f"{len(files)} arquivo(s) recebidos","restrito": restrito, "file_name": user_file_name})



if __name__ == "__main__":
    app.run(debug=True, port=5000)
    