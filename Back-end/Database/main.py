import conection


if __name__ == "__main__":
    cnx = conection.connect_to_mysql()
    cursor = cnx.cursor()

    cursor._connection.commit()
    
    print(cnx.connection_id)

    # for statement in statements:
    #     cursor.execute(statement)
