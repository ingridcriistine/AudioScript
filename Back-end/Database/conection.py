from dotenv import load_dotenv
import pymysql
import os 


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
