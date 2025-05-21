import boto3
import os
from botocore.exceptions import ClientError
import logging


s3_client = boto3.client('s3')

def upload_file(file_path, bucket, object_name=None):

    if object_name==None:
        object_name = os.path.basename(file_path)

    try:
        response = s3_client.upload_file(file_path, bucket, f'pdf-files/{object_name}')
    except ClientError as e:
        logging.error(e)
        return False
    return True

def download_file(bucket, object_name, file_name=None):

    if file_name == None:
        file_name = os.path.basename(object_name)

    try:
        response = s3_client.download_file(bucket, f'pdf-files/{object_name}', file_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def delete_file(bucket, object_name):
    try:
        response = s3_client.delete_object(Bucket=bucket, 
                                           Key=f'pdf-files/{object_name}')
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

    download = download_file(bucket, file_name, f'./AudioScript/Back-end/downloaded-files-from-s3/{file_name}')

    if download == True:
        logging.info(f'file {file_path} uploaded with success')
        print('Arquivo baixado!')
