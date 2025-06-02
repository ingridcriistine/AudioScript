from errno import errorcode
from dotenv import load_dotenv
import os 
import mysql.connector
from mysql.connector import errorcode
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
            user='matias',
            password='root',
            host="127.0.0.1",
            port=3306,
            database='audioscript'
        )
        
    except mysql.connector.Error as e:
        if e.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            logging.error("Something is wrong with your user name or password")
        elif e.errno == errorcode.ER_BAD_DB_ERROR:
            logging.error("Database does not exist")
        else:
            logging.error(e)
    if cnx.connection_id != None:
        logging.info("Succesfully connected into mysql.")
    return cnx

def insert_file_into_mysql(
        cnx: mysql.connector.CMySQLConnection,
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
    cursor.execute(query_sql, (nome, data_transcricao, employer_id, empresa_id))
    cnx.commit()
    cnx.close()
    logging.info(f"File '{nome}' succesfully inserted into table Arquivo")

def create_private_folder(cnx: mysql.connector.CMySQLConnection):
    cursor = cnx.cursor()
    query_sql = "SELECT id FROM Pasta WHERE Nome = 'pasta_privada'"
    cursor.execute(query_sql)
    result = cursor.fetchone()
    if result == None:
        query_sql = "INSERT INTO Pasta (Nome, Is_private) VALUES ('pasta_privada', 1)"
        cursor.execute(query_sql)
        cnx.commit()
        cnx.close()


def file_folder_attachment(cnx: mysql.connector.CMySQLConnection,filename: str, foldername: str):
    cursor = cnx.cursor()
    query_sql = "SELECT id FROM Pasta WHERE Nome = %s"
    cursor.execute(query_sql, (foldername,))
    folder_id = cursor.fetchone()[0]

    query_sql = """SELECT id FROM Arquivo WHERE Nome = %s"""
    cursor.execute(query_sql, (filename,))
    file_id = cursor.fetchone()[0]
    query_sql = """UPDATE Arquivo SET Fk_Pasta_Id = %s WHERE id = %s"""
    cursor.execute(query_sql, (folder_id, file_id))
    cnx.commit()
    cnx.close()
    logging.info(f"file {filename} attached to folder {foldername}")

if __name__=="__main__":
    cnx = connect_to_mysql()
    cursor = cnx.cursor()
    print(cnx.connection_id)
