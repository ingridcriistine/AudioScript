from errno import errorcode
from dotenv import load_dotenv
import os 
import mysql.connector


load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

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
            print("Something is wrong with your user name or password")
        elif e.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(e)
        print("AA")
    return cnx

def insert_file_to_mysql(cursor: mysql.connector.cursor,
                         nome: str,
                         data_transcricao: str,
                         employer_id: int,
                         empresa_id: int
                         ):
    query_sql = """USE audioscript"""
    cursor.execute(query_sql)
    query_sql = f"""INSERT INTO Arquivo(nome, DataTranscricao, Fk_Employer_id, Fk_Empresa_id) values
        ({nome}, {data_transcricao}, {employer_id}, {empresa_id})
    """
    cursor.execute(query_sql)
    print(f"File {nome} inserted succesfully into Arquivo")

if __name__=="__main__":
    cnx = connect_to_mysql()
    cursor = cnx.cursor()

