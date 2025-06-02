from flask import Blueprint, request, jsonify
from Database.conection import connect_to_mysql, attachment_file_folder
import logging


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

file_folder = Blueprint('folder_operations', __name__)

@file_folder.route('attachment', methods=['UPDATE'])
def attach_file_to_folder():
    data = request.form
    filename = data.get('filename')
    foldername = data.get('foldername')

    if filename == None:
        raise ValueError(f'Value {filename} not allowed for filename')
    if foldername == None:
        raise ValueError(f'Value {foldername} not allowed for foldername')
    
    if attachment_file_folder(filename, foldername):
        logging.info(f"file {filename} attached to folder {foldername}")


@file_folder.route('detachment', method='UPDATE')
def detach_file_from_folder():
    data = request.form
