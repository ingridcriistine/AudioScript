from flask import Flask, jsonify
from flask_cors import CORS
from models import db, User

app = Flask(__name__)
CORS(app)

# BD 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://usuario:senha@localhost/nome_do_banco'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name} for user in users])

if __name__ == "__main__":
    ##
    ## Códigos BD
    ##
    app.run(debug=True, port=5000)
    
