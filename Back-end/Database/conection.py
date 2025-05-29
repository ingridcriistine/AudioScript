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
        cnx = mysql.connector.connect(user='root',
                                        password='root',
                                        host='localhost',
                                        port=3306,
                                        database='audioscript')
        return cnx
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
    cursor.execute(query_sql, (nome, data_transcricao, employer_id, empresa_id))
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
    # attach_file_on_folder_mysql(cnx)
