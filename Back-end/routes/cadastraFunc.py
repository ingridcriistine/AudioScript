# routes/login.py
from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql
cadastraFunc_bp = Blueprint('cadastraFunc', __name__, url_prefix='/cadastraFunc')

getFunc_bp = Blueprint('user', __name__, url_prefix='/user')

@getFunc_bp.route('/<int:funcId>', methods=['GET'])
def getFunc(funcId):
    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT nome FROM Emplyer WHERE id = %i", (funcId,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return {"nome": result["nome"]}
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

    except Exception as e:
        print("Erro ao buscar funcionario", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500

@cadastraFunc_bp.route('/auth', methods=['POST'])
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
            "INSERT INTO Employer (Nome, codigoFunc, Email) VALUES (%s, %s. %s)",
            (nomeColaborador, codColaborador, emailColaborador)
        )

        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        if resultado:
            return jsonify({"mensagem": "Usuario cadastrado com sucecsso"})
        else:
            return jsonify({"erro": "Erro ao cdastar"}), 401

    except Exception as e:
        print("Erro ao cadastrar:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500
