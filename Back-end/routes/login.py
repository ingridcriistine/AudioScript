# routes/login.py
from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql
login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/', methods=['GET'])
def login_form():
    return 'Página de login (simples)'

@login_bp.route('/auth', methods=['POST'])
def autenticar():
    dados = request.json
    codigoEmpresa = dados.get('codEmpresa')
    codigoFunc = dados.get('codFuncionario')

    if not codigoEmpresa or not codigoFunc:
        return jsonify({"erro": "Campos obrigatórios não enviados"}), 400

    try:
        conn = connect_to_mysql()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT Employer.CodigoFunc, Employer.Codigo FROM Employer JOIN Empresa ON Employer.Fk_Empresa_Id = Empresa.Id WHERE Employer.CodigoFunc = %s AND Empresa.Id = %s;",
            (codigoFunc, codigoEmpresa)
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
