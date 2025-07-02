# routes/login.py
from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql

cadastraFunc_bp = Blueprint('cadastraFunc', __name__, url_prefix='/cadastraFunc')
getFunc_bp = Blueprint('user', __name__, url_prefix='/user')
getAllFunc_bp = Blueprint('users', __name__, url_prefix='/users')

@getAllFunc_bp.route('/<idAdm>', methods=['GET'])
def getAllFunc(idAdm):
    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        # Buscar empresa do admin
        cursor.execute("SELECT Fk_Empresa_Id FROM Employer WHERE Id = %s", (idAdm,))
        empresa = cursor.fetchone()

        if not empresa:
            return jsonify({"erro": "Admin não encontrado"}), 404

        fk_empresa = empresa["Fk_Empresa_Id"]

        # Buscar colaboradores da mesma empresa
        cursor.execute("""
            SELECT CodigoFunc, Nome, Email 
            FROM Employer 
            WHERE Fk_Empresa_Id = %s
        """, (fk_empresa,))

        results = cursor.fetchall()

        return jsonify(results) if results else jsonify([])

    except Exception as e:
        print("Erro ao buscar colaboradores por empresa:", e)
        return jsonify({"erro": "Erro ao buscar colaboradores"}), 500
    finally:
        cursor.close()
        conn.close()


@getFunc_bp.route('/<userId>', methods=['GET'])
def getFunc(userId):
    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        print(userId)

        cursor.execute("""SELECT Nome FROM Employer WHERE Id = %s""", (userId,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return jsonify({"nome": result["Nome"]})
        else:
            print("Usuário não encontrado.")
            return jsonify({"erro": "Usuário não encontrado"}), 404

    except Exception as e:
        print("Erro ao buscar funcionário:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500


@cadastraFunc_bp.route('',methods=['POST'])
def cadastrar():
    dados = request.json
    nomeColaborador = dados.get('nomeColaborador')
    codColaborador = int(dados.get('codColaborador'))
    emailColaborador = dados.get('emailColaborador')
    idAdm = int(dados.get('idAdm')) # <--- **Pegue o userId enviado do frontend**
    
    if not nomeColaborador or not codColaborador or not emailColaborador or not idAdm:
        return jsonify({"erro": "Campos obrigatórios não enviados"}), 400

    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        print(idAdm)
        cursor.execute(
            "SELECT Fk_Empresa_Id FROM Employer WHERE Id = %s",
            (idAdm,)
        )
        
        user_data = cursor.fetchone()

        print(user_data)

        if not user_data or 'Fk_Empresa_Id' not in user_data or user_data['Fk_Empresa_Id'] is None:
            cursor.close()
            conn.close()
            return jsonify({"erro": "ID de usuário inválido ou empresa não encontrada"}), 404

        fkEmpresa = user_data['Fk_Empresa_Id']

        cursor.execute(
            "INSERT INTO Employer (Nome, CodigoFunc, Email, Fk_Empresa_Id, Is_Admin) VALUES (%s, %s, %s, %s, %s)",
            (nomeColaborador, codColaborador, emailColaborador, fkEmpresa, 0,) # <--- **Adicionando codEmpresa aqui**
        )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"mensagem": "Funcionário cadastrado com sucesso"})

    except Exception as e:
        print(f"Erro ao cadastrar funcionário: {e}") # Usar f-string para melhor depuração
        return jsonify({"erro": "Erro interno no servidor ao cadastrar funcionário"}), 500
