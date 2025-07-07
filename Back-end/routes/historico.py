import logging
from flask import Blueprint, request, jsonify

from Database.conection import connect_to_mysql

criar_pasta_bp = Blueprint('pasta', __name__, url_prefix='/api')
get_arquivos_bp = Blueprint('arquivos', __name__, url_prefix='/api')
get_pastas_bp = Blueprint('pastas', __name__, url_prefix='/api')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)


@criar_pasta_bp.route('/criarPasta', methods=['POST'])
def criar_pasta():
    dados = request.json
    nome_pasta = dados.get('nomePasta')
    id_empresa = int(dados.get('empresaId'))
    try:
        cnx = connect_to_mysql()
        cursor = cnx.cursor()
        query_sql = """
                    INSERT INTO Pasta(Nome, Is_private, Fk_Empresa_Id)
                    VALUES (%s, 0, %s)     
                    """
        cursor.execute(query_sql, (nome_pasta, id_empresa))
        cnx.commit()
    except Exception as e:
        logging.info(f"Error while inserting into database: {e}")
        jsonify({f"Error while inserting into database: {e}"})

    finally: 
        cnx.close()

    logging.info(f"Succesfully created folder {nome_pasta}")
    return jsonify({"mensagem": f"Succesfully created folder {nome_pasta}", "name": nome_pasta})

@get_arquivos_bp.route("/getArquivos", methods=["GET"])
def get_arquivos():
    empresa_id = request.args.get("empresaId")
    user_id = request.args.get("userId")

    try:
        cnx = connect_to_mysql()
        cursor = cnx.cursor()
        query_sql = """
                    SELECT 
                        Id,
                        Nome
                    FROM 
                        Arquivo
                    WHERE
                        Fk_Empresa_Id = %s 
                    """
        cursor.execute(query_sql, (empresa_id,))
        rows = cursor.fetchall()
    except Exception as e:
        logging.info(f"Error while getting arquivos from database: {e}")
        jsonify({f"Error while getting arquivos from database: {e}"})

    finally:
        cnx.close()
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "nome": row[1]
        })
    logging.info(f"Query succesfully executed")
    return jsonify({"results": results})

@get_pastas_bp.route("/getPastas", methods=["GET"])
def get_arquivos():
    empresa_id = request.args.get("empresaId")
    user_id = request.args.get("userId")

    try:
        cnx = connect_to_mysql()
        cursor = cnx.cursor()
        query_sql = """
                    SELECT 
                        Id,
                        Nome
                    FROM 
                        Pasta
                    WHERE
                        Fk_Empresa_Id = %s 
                    """
        cursor.execute(query_sql, (empresa_id,))
        rows = cursor.fetchall()
    except Exception as e:
        logging.info(f"Error while getting pastas from database: {e}")
        jsonify({f"Error while getting pastas from database: {e}"})

    finally:
        cnx.close()
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "nome": row[1]
        })
    logging.info(f"Query succesfully executed")
    return jsonify({"results": results})