# routes/login.py
from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql
cadastraFunc_bp = Blueprint('cadastraFunc', __name__, url_prefix='/cadastraFunc')

@cadastraFunc_bp.route('/', methods=['GET'])
def cadastraFunc_form():
    return 'Página de cadastraFunc (simples)'

@cadastraFunc_bp.route('/auth', methods=['POST'])
def autenticar():
    dados = request.json
    nomeColaborador = dados.get('nomeColaborador')
    codColaborador = dados.get('codColaborador')
    emailColaborador = dados.get('emailColaborador')
    
    
    
    if not nomeColaborador or not codColaborador or not emailColaborador:
        return jsonify({"erro": "Campos obrigatórios não enviados"}), 400

    
    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            # codigo de insert
        )

        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        if resultado:
            return jsonify({"mensagem": "Usuario cadastrado com sucecsso"})
        else:
            return jsonify({"erro": "Usuário ou senha inválidos"}), 401

    except Exception as e:
        print("Erro no login:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500
