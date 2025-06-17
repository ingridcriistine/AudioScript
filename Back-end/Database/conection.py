from errno import errorcode
from dotenv import load_dotenv
import os 
import mysql.connector
from mysql.connector import Error
import mysql.connector.cursor
import logging

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

def connect_to_mysql():
    try:
        cnx = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="root",
            database="AudioScript"
        )
        if cnx.is_connected():
            print("✅ Conectado ao banco com sucesso!")
            return cnx
        else:
            print("❌ Falha na conexão com o banco.")
            return None

    except Error as err:
        print(f"❌ Erro ao conectar ao banco: {err}")
        return None

def insert_file_into_mysql(
        cnx: mysql.connector.connection,
        nome: str,
        data_transcricao: str,
        employer_id: int,
        empresa_id: int
    ):
    cursor = cnx.cursor()
    query_sql = """USE audioscript"""
    cursor.execute(query_sql)
    query_sql = """
    INSERT INTO Arquivo (nome, DataTranscricao, Fk_Employer_id, Fk_Empresa_id)
    VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query_sql, (nome, data_transcricao, 1, 1))
    cnx.commit()
    logging.info(f"File '{nome}' succesfully inserted into table Arquivo")

def attach_file_on_folder_mysql(cnx: mysql.connector.connection, filename: str):
    cursor = cnx.cursor()
    query_sql = "SELECT id FROM Pasta WHERE Nome = 'pasta_privada'"
    cursor.execute(query_sql)
    result = cursor.fetchone()
    if result == None:
        query_sql = "INSERT INTO Pasta (Nome, Is_private) VALUES ('pasta_privada', 1)"
        cursor.execute(query_sql)
        cnx.commit()
        query_sql = "SELECT id FROM Pasta WHERE Nome = 'pasta_privada'"
        cursor.execute(query_sql)
        pasta_id = cursor.fetchone()[0]
    else:
        pasta_id = result[0]

    query_sql = """SELECT id FROM Arquivo WHERE Nome = %s"""
    cursor.execute(query_sql, (filename,))
    file_id = cursor.fetchone()[0]
    query_sql = """UPDATE Arquivo SET Fk_Pasta_Id = %s WHERE id = %s"""
    cursor.execute(query_sql, (pasta_id, file_id))
    cnx.commit()

if __name__=="__main__":
    cnx = connect_to_mysql()
    cursor = cnx.cursor()
    print(cnx.connection_id)
