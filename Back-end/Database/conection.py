from errno import errorcode
from dotenv import load_dotenv
import os 
import mysql.connector
from mysql.connector import Error
import mysql.connector.cursor
import logging
from typing import Optional

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

def connect_to_mysql() -> Optional[CMySQLConnection]:
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
        nome: str,
        data_transcricao: str,
        employer_id: int,
        empresa_id: int
    ) -> bool:

    try:
        cnx = connect_to_mysql()
        if cnx.connection_id is None:
            raise ConnectionError('Could not connect to MySQL')
        
        with cnx.cursor() as cursor:
            cursor.execute("USE audioscript")
            query_sql = """
                INSERT INTO Arquivo (nome, DataTranscricao, Fk_Employer_id, Fk_Empresa_id)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query_sql, (nome, data_transcricao, employer_id, empresa_id))
            cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        cnx.close()
        raise e

def create_private_folder() -> bool:
    try:
        cnx = connect_to_mysql()
        if cnx.connection_id is None:
            raise ConnectionError('Could not connect to MySQL')
        with cnx.cursor() as cursor:
            query_sql = "SELECT id FROM Pasta WHERE Nome = 'pasta_privada'"
            cursor.execute(query_sql)
            result = cursor.fetchone()
            if result is None:
                query_sql = "INSERT INTO Pasta (Nome, Is_private) VALUES ('pasta_privada', 1)"
                cursor.execute(query_sql)
                cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        cnx.close()
        raise e
    
def attachment_file_folder(filename: str, foldername: str) -> bool:
    try:
        cnx = connect_to_mysql()
        if cnx.connection_id is None:
            raise ConnectionError('Could not connect to MySQL')
        
        with cnx.cursor() as cursor:
            cursor.execute("SELECT id FROM Pasta WHERE Nome = %s", (foldername,))
            folder_row = cursor.fetchone()
            if folder_row is None:
                raise ValueError(f'Folder {foldername} not found')
            folder_id = folder_row[0]

            cursor.execute("SELECT id FROM Arquivo WHERE Nome = %s", (filename,))
            file_row = cursor.fetchone()
            if file_row is None:
                raise ValueError(f'File {filename} not found')
            file_id = file_row[0]

            query_sql = """UPDATE Arquivo SET Fk_Pasta_Id = %s WHERE id = %s"""
            cursor.execute(query_sql, (folder_id, file_id))
            cnx.commit()
        cnx.close()
        return True
    except Exception as e:
        cnx.close()
        raise e


if __name__=="__main__":
    cnx = connect_to_mysql()
    cursor = cnx.cursor()
    print(cnx.connection_id)
