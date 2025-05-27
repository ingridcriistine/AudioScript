# routes/login.py
from flask import Blueprint, request, jsonify
from connectMysql import db  # Você já deve ter uma conexão MySQL pronta aqui

login_bp = Blueprint('login', __name__, url_prefix='/login')

# Apenas rota de teste simples
@login_bp.route('/', methods=['GET'])
def login_form():
    return 'Página de login (simples)'

@login_bp.route('/auth', methods=['POST'])
def autenticar():
    dados = request.json
    codigoEmpresa = dados.get('codigoEmpresa')
    codigoFunc = dados.get('codigoFunc')

    if not codigoEmpresa or not codigoFunc:
        return jsonify({"erro": "Campos obrigatórios não enviados"}), 400

    try:
        conn = db
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM usuarios WHERE usuario = %s AND senha = %s",
            (codigoEmpresa, codigoFunc)
        )

        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        if resultado:
            return jsonify({"mensagem": "Login bem-sucedido", "usuario": resultado})
        else:
            return jsonify({"erro": "Usuário ou senha inválidos"}), 401

    except Exception as e:
        print("Erro no login:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500
