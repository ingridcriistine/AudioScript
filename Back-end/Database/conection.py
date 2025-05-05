import pymysql


def connect_to_aws_rds():
    db = pymysql.connect(host='audioscript-rds.c7w666ks6bhc.sa-east-1.rds.amazonaws.com', 
                        user='matias', 
                        password='12345678')
    cursor = db.cursor()
    return cursor, db

