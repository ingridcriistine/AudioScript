import pymysql
from dotenv import load_dotenv
import os
import mysql.connector

load_dotenv()
HOST = os.getenv("HOSTAWSRDS")
USER = os.getenv("USERAWSRDS")
PASSWORD = os.getenv("PWDAWSRDS")

#BD
def connect_to_aws_rds():
    db = pymysql.connect(
        host=HOST, 
        user=USER, 
        password=PASSWORD
    )
    cursor = db.cursor()
    return cursor, db

def connect_to_mysql():
    db = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        passwd="root",
        database="audioScript"
    )
    cursor = db.cursor()
    return cursor, db

# cursor, db =connect_to_aws_rds()
cursor, db = connect_to_mysql()
