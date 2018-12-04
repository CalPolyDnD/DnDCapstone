import boto3
import os

s3 = boto3.resource('s3')
_BUCKET_NAME = 'dnd-datamaster-datasets'  # change this to your bucket name


def upload_file_from_path(path_to_file):
    with open(path_to_file, 'rb') as file:
        s3.Object(_BUCKET_NAME, os.path.basename(path_to_file)).put(Body=file)


def upload_file(file, name):
    s3.Object(_BUCKET_NAME, name.put(Body=file))


def fetch_file(self, file_name):
    # s3.Bucket(BUCKET_NAME).download_file(file_name, 'testDownload.csv')
    pass

