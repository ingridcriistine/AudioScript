from dotenv import load_dotenv
import os 
import mysql.connector
from mysql.connector import errorcode
import mysql.connector.cursor


load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

def connect_to_mysql():
    try:
        cnx = mysql.connector.connect(user='matias',
                                        password='root',
                                        host='127.0.0.1',
                                        database='audioscript')
    except mysql.connector.Error as e:
        if e.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif e.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(e)
    if cnx.connection_id != None:
        print("Succesfully connected into mysql.")
    return cnx

def insert_file_into_mysql(cnx: mysql.connector.connection,
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
    print(f"File '{nome}' succesfully inserted into table Arquivo")

if __name__=="__main__":
    cnx = connect_to_mysql()
    cursor = cnx.cursor()
    insert_file_into_mysql(cnx, "laksdj", "2025-05-14 09:45:20.324", 1,1)
