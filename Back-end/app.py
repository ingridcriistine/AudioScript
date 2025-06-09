from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from Conversor.main import transform_mp4_to_mp3
from Database.conection import connect_to_mysql, insert_file_into_mysql, create_private_folder, attachment_file_folder
from CreatePdf.main import create_pdf
from AwsS3Operations.main import upload_file_to_s3, download_file_from_s3, delete_file_from_s3
from Transcription.main import transcribe_audio
from datetime import datetime
import logging
from routes.login import login_bp
from typing import Optional

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")
UPLOAD_FOLDER = 'mp3-files'
AWS_BUCKET = 'audioscript-s3-bucket'

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.register_blueprint(login_bp) 

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/uploadfiles', methods=['POST'])
def upload_files() -> Optional[Response.json]:
    data = request.form
    restricted = data.get('restrito') 
    user_file_name = data.get('user-file-name')
    user_id = data.get('idUser')
    empresa_id = data.get('idEmpresa')

    files = request.files.getlist('files')  
    if len(files) < 1:
        raise FileNotFoundError('No file provided')
    for f in files:
        filename = secure_filename(f.filename)
        _, ext = os.path.splitext(filename)
        if ext != ".mp3" and ext != ".mp4":
            raise TypeError(f'File type should be mp3 or mp4 not {ext}')
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        logging.info(f'file saved on /{UPLOAD_FOLDER}/{f.filename}')

    today = datetime.now()
    date = str(today.date())
    time = today.time()
    time = time.strftime("%H-%M-%S-%f")
    
    mp3_files = os.listdir(UPLOAD_FOLDER)
    if len(mp3_files) < 1:
        raise FileNotFoundError(f'No files on path {UPLOAD_FOLDER}/')

    all_transcriptions = []
    for file in mp3_files:
        timestamp = f'{date}_{time}' 
        transcription = transcribe_audio(f'{UPLOAD_FOLDER}/{file}')
        all_transcriptions.append(transcription)
    filename_on_db_and_aws = f'{user_file_name}_{timestamp}'
    pdf_transcription_file = create_pdf(all_transcriptions, filename_on_db_and_aws)

    object_name = upload_file_to_s3(pdf_transcription_file, AWS_BUCKET, pdf_transcription_file)
    if object_name is not None:
        logging.info(f'Object {object_name} succesfully uploaded to s3')

    if insert_file_into_mysql(filename_on_db_and_aws, date, user_id, empresa_id):
        logging.info(f"File '{filename_on_db_and_aws}' succesfully inserted into table Arquivo")

    if restricted == "sim":
        if create_private_folder():
            logging.info('Private folder sucesfully created on MySQL')
        if attachment_file_folder(filename_on_db_and_aws, 'pasta_privada'):
            logging.info(f'File {filename} attached to folder')

    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.isfile(file_path):
            os.remove(file_path) 
            logging.info(f"Audio file deleted: {filename}")

    os.remove(f"{filename_on_db_and_aws}.pdf")
    logging.info(f"PDF file deleted: {filename_on_db_and_aws}.pdf")
    return jsonify({"message": f"Arquivo recebido e operacoes feitas com sucesso."})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
    