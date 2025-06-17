from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
import smtplib
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import mysql.connector
from werkzeug.utils import secure_filename
from Conversor.main import transform_mp4_to_mp3
from Database.conection import connect_to_mysql, insert_file_into_mysql, attach_file_on_folder_mysql
from CreatePdf.main import create_pdf
from AwsS3Operations.main import upload_file_to_s3, download_file_from_s3, delete_file_from_s3
from Transcription.main import transcribe_audio
from datetime import datetime
import logging
from routes.login import login_bp
import logging

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")
UPLOAD_FOLDER = 'mp3-files'
MP3_FOLDER_PATH = f'{UPLOAD_FOLDER}/'
AWS_BUCKET = 'audioscript-s3-bucket'
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

db_config = {
    'host': 'localhost',
    'port': 3307,
    'user': 'root',
    'password': 'root',
    'database': 'AudioScript'
}

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(login_bp) 
# chamando login

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/uploadfiles', methods=['POST'])
def upload_files():
    restricted = request.form.get('restrito') 
    user_file_name = request.form.get('user-file-name')
    user_id = request.form.get('idUser')
    empresa_id = request.form.get('idEmpresa')
    files = request.files.getlist('files')  
    for f in files:
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        logging.info(f'file saved on /{UPLOAD_FOLDER}/{f.filename}')

    today = datetime.now()
    date = str(today.date())
    time = today.time()
    time = time.strftime("%H-%M-%S-%f")
    mp3_files = os.listdir(MP3_FOLDER_PATH)
    all_transcriptions = []
    for file in mp3_files:
        timestamp = f'{date}_{time}' 
        transcription = transcribe_audio(f'{MP3_FOLDER_PATH}/{file}')
        all_transcriptions.append(transcription)

    filename_on_db_and_aws = f'{user_file_name}_{timestamp}'
    pdf_transcription_file = create_pdf(all_transcriptions, filename_on_db_and_aws)
    upload_file_to_s3(pdf_transcription_file, AWS_BUCKET, pdf_transcription_file)
    cnx = connect_to_mysql()
    if restricted == "sim":
        insert_file_into_mysql(cnx, filename_on_db_and_aws, date, user_id, empresa_id)
        attach_file_on_folder_mysql(cnx, filename_on_db_and_aws)
    else:
        insert_file_into_mysql(cnx, filename_on_db_and_aws, date, user_id, empresa_id)

    for filename in os.listdir(MP3_FOLDER_PATH):
        file_path = os.path.join(MP3_FOLDER_PATH, filename)
    
        if os.path.isfile(file_path):
            os.remove(file_path) 
            logging.info(f"File deleted: {filename}")
    os.remove(f"{filename_on_db_and_aws}.pdf")
    logging.info(f"File deleted: {filename_on_db_and_aws}.pdf")
    return jsonify({"message": f"{len(files)} arquivo(s) recebidos","restrito": restricted, "file_name": user_file_name})


@app.route('/api/criar-empresa', methods=['POST'])
def criar_empresa():
    data = request.get_json()
    nome_empresa = data.get('company')
    email_usuario = data.get('email')

    if not (nome_empresa and email_usuario):
        return jsonify({"error": "Preencha todos os campos"}), 400

    codigo_empresa = str(random.randint(100000, 999999))
    codigo_funcionario = random.randint(1000, 9999)
    nome_admin = f"Adm{nome_empresa.replace(' ', '')}"

    connection = None
    cursor = None

    try:
        connection = connect_to_mysql()  # Usa sua função padrão
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO Empresa (Nome, Codigo) VALUES (%s, %s)",
            (nome_empresa, codigo_empresa)
        )
        empresa_id = cursor.lastrowid

        cursor.execute(
            "INSERT INTO Employer (CodigoFunc, Nome, Email, Is_admin, Fk_Empresa_Id) "
            "VALUES (%s, %s, %s, %s, %s)",
            (codigo_funcionario, nome_admin, email_usuario, True, empresa_id)
        )

        connection.commit()

        enviar_email_com_dados(
            nome_empresa, nome_admin, email_usuario, codigo_empresa, codigo_funcionario
        )

        return jsonify({
            "message": "Empresa e usuário admin criados com sucesso!",
            "codigo_empresa": codigo_empresa,
            "codigo_funcionario": codigo_funcionario,
            "usuario_admin": nome_admin,
            "email_admin": email_usuario
        }), 200

    except mysql.connector.Error as err:
        print("Erro no banco:", err)
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()



def enviar_email_com_dados(nome_empresa, nome_admin, email, codigo_empresa, codigo_funcionario):
    remetente = EMAIL_USER
    senha = EMAIL_PASS

    mensagem = MIMEMultipart("alternative")
    mensagem["Subject"] = "Dados de acesso - Plataforma AudioScript"
    mensagem["From"] = remetente
    mensagem["To"] = email

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Olá {nome_admin},</h2>
        <p>Seja bem-vindo(a) à plataforma <b>AudioScript</b>.</p>

        <p>A sua empresa <b>{nome_empresa}</b> foi cadastrada com sucesso.</p>

        <h3>🚀 Dados de acesso:</h3>
        <ul>
            <li><b>Código da Empresa:</b> {codigo_empresa}</li>
            <li><b>Código do Usuário:</b> {codigo_funcionario}</li>
            <li><b>Usuário:</b> {nome_admin}</li>
        </ul>

        <p>Você poderá acessar a plataforma utilizando esses dados no link abaixo:</p>
        <p><a href="https://audioscript.com.br" target="_blank" style="color: #FFA500;">Acessar Plataforma</a></p>

        <br>
        <p style="font-size: 14px; color: #555;">
        <b>Observação:</b> Este é o seu usuário administrador. Com ele você poderá criar outros usuários, organizar arquivos e gerenciar sua empresa.
        </p>

        <br>
        <p>Atenciosamente,</p>
        <p><b>Equipe AudioScript</b></p>
    </body>
    </html>
    """

    mensagem.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(remetente, senha)
            server.sendmail(remetente, email, mensagem.as_string())
        print("E-mail enviado com sucesso")
    except Exception as e:
        print("Erro ao enviar e-mail:", e)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    