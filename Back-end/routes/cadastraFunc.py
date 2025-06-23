# routes/login.py
from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql

cadastraFunc_bp = Blueprint('cadastraFunc', __name__, url_prefix='/cadastraFunc')

getFunc_bp = Blueprint('user', __name__, url_prefix='/user')

@getFunc_bp.route('', methods=['GET'])
def testeGet():
        return 'a'

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


@cadastraFunc_bp.route('/cadastrar', methods=['POST'])
def autenticar():
    dados = request.jsons
    nomeColaborador = dados.get('nomeColaborador')
    codColaborador = dados.get('codColaborador')
    emailColaborador = dados.get('emailColaborador')
    
    if not nomeColaborador or not codColaborador or not emailColaborador:
        return jsonify({"erro": "Campos obrigatórios não enviados"}), 400

    
    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "INSERT INTO Employer (Nome, codigoFunc, Email) VALUES (%s, %s, %s)",
            (nomeColaborador, codColaborador, emailColaborador)
        )

        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        if resultado:
            return jsonify({"mensagem": "Usuario cadastrado com sucecsso"})
        else:
            return jsonify({"erro": "Erro ao cadastar"}), 401

    except Exception as e:
        print("Erro ao cadastrar:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500
