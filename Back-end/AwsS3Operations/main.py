import boto3
import os
from botocore.exceptions import ClientError
import logging


BUCKET_FOLDER = 'pdf-files'
s3_client = boto3.client('s3')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S' 
)

def upload_file_to_s3(file_path, bucket, object_name=None):

    if object_name==None:
        object_name = os.path.basename(file_path)

    try:
        response = s3_client.upload_file(file_path, bucket, f'{BUCKET_FOLDER}/{object_name}')
    except ClientError as e:
        logging.error(e)
        return False
    logging.info(f'Object {object_name} uploaded to s3')
    return True

def download_file_from_s3(bucket, object_name, file_name=None):

    if file_name == None:
        file_name = os.path.basename(object_name)

    try:
        response = s3_client.download_file(bucket, f'{BUCKET_FOLDER}/{object_name}', file_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def delete_file_from_s3(bucket, object_name):
    try:
        response = s3_client.delete_object(Bucket=bucket, 
                                           Key=f'{BUCKET_FOLDER}/{object_name}')
    except ClientError as e:
        logging.error(e)
        return False
    return True

file_name = 'output3.pdf'
file_path = f"./AudioScript/Back-end/{file_name}"
bucket = 'audioscript-s3-bucket'

if __name__=="__main__":
    # upload = upload_file(file_path, bucket, file_name)


    # if upload == True:
    #     logging.info(f'file {file_path} uploaded with success')
    #     print('Arquivo enviado!')

    download = download_file_from_s3(bucket, file_name, f'./AudioScript/Back-end/downloaded-files-from-s3/{file_name}')

    if download == True:
        logging.info(f'file {file_path} uploaded with success')
        logging.info('Arquivo baixado!')
