import conection

if __name__ == "__main__":
    cursor = conection.connect_to_aws_rds()[0]
    db = conection.connect_to_aws_rds()[1]
    
    cursor.connection.commit()
    
    sql = '''use audioscript_db'''
    cursor.execute(sql)
    
    sql = '''show tables'''
    cursor.execute(sql)
    print(cursor.fetchall())
    
#     statements = [
#     """
#     CREATE TABLE IF NOT EXISTS Empresa (
#         Id INT PRIMARY KEY AUTO_INCREMENT,
#         Nome VARCHAR(100) NOT NULL,
#         Codigo VARCHAR(100) NOT NULL
#     )
#     """,
#     """
#     CREATE TABLE IF NOT EXISTS Employer (
#         codigoFunc INT PRIMARY KEY,
#         codEmpresa INT,
#         Nome VARCHAR(100) NOT NULL,
#         Email VARCHAR(100),
#         Admin BOOLEAN DEFAULT FALSE,
#         fk_Empresa_Id INT,
#         FOREIGN KEY (fk_Empresa_Id) REFERENCES Empresa(Id)
#     )
#     """,
#     """
#     CREATE TABLE IF NOT EXISTS Pasta (
#         Id INT PRIMARY KEY AUTO_INCREMENT,
#         Nome VARCHAR(100) NOT NULL,
#         Arquivo TEXT,
#         Privado BOOLEAN DEFAULT FALSE,
#         Senha VARCHAR(255)
#     )
#     """,
#     """
#     CREATE TABLE IF NOT EXISTS Arquivo (
#         Id INT PRIMARY KEY AUTO_INCREMENT,
#         Titulo VARCHAR(200) NOT NULL,
#         DataTranscricao DATE,
#         DataEdicao DATE,
#         Editado BOOLEAN DEFAULT FALSE,
#         IdFuncionario INT,
#         fk_Pasta_Id INT,
#         fk_Employer_codigoFunc INT,
#         fk_Empresa_Id INT,
#         FOREIGN KEY (fk_Pasta_Id) REFERENCES Pasta(Id),
#         FOREIGN KEY (fk_Employer_codigoFunc) REFERENCES Employer(codigoFunc),
#         FOREIGN KEY (fk_Empresa_Id) REFERENCES Empresa(Id)
#     )
#     """
# ]

#     for statement in statements:
#         cursor.execute(statement)
