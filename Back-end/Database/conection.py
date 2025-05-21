from dotenv import load_dotenv
import pymysql
import os 
import mysql.connector
from mysql.connector import errorcode


load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

def connect_to_aws_rds():
    db = pymysql.connect(
        host=HOST, 
        user=USER, 
        password=PASSWORD 
        )
    cursor = db.cursor()
    return cursor, db

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
    return cnx