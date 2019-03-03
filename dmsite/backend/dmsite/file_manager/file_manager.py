from django.http import JsonResponse
import boto3
from boto3.dynamodb.conditions import Key
import os
import json

s3 = boto3.resource('s3')
BUCKET_NAME = 'dm-data-file-storage-test'  # change this to your bucket name


def upload_file_from_path(path_to_file):
    with open(path_to_file, 'rb') as file:
        s3.Object(BUCKET_NAME, os.path.basename(path_to_file)).put(Body=file)


def upload_file(file, name):
    s3.Object(BUCKET_NAME, name.put(Body=file))


def fetch_file(file_name):
    # commented out so boto doesn't scream
    filepath = "media/" + file_name
    s3.Bucket(BUCKET_NAME).download_file(file_name, filepath)