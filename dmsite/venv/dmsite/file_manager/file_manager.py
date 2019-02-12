import boto3
import os
from django.http import JsonResponse
import json

s3 = boto3.resource('s3')
BUCKET_NAME = 'dm-data-file-storage-test'  # change this to your bucket name


def upload_file_from_path(path_to_file):
    with open(path_to_file, 'rb') as file:
        s3.Object(BUCKET_NAME, os.path.basename(path_to_file)).put(Body=file)


def upload_file(file, name):
    s3.Object(BUCKET_NAME, name.put(Body=file))


def fetch_file(self, file_name):
    # commented out so boto doesn't scream
    # s3.Bucket(BUCKET_NAME).download_file(file_name, 'testDownload.csv')
    pass


def get_file_details(request):
    if (request.method == 'POST'):
        data = json.loads(str(request.body, encoding='utf-8'))
        filename = data['name']
        details = get_details(filename)
        return JsonResponse(details, 200)
    return JsonResponse({"error": "not a POST request"}, 400)


def get_details(filename):
    data = {}
    data['test'] = '123'

    ''' 
        Expected Output:
        {
            “Name”: string,
            “Classifications”: {
                <classification information…>
            }
        },
            “Meta”: {
                <metadata such as add date, classification date, etc.>
            }
        }
    '''

    return data


def get_dataset_header(request):
    if (request.method == 'POST'):
        data = json.loads(str(request.body, encoding='utf-8'))
        header = get_file_header(data)
        return JsonResponse(header, 200);
    return JsonResponse({"error": "not a POST request", 400})


def get_file_header(data):
    header = {}
    header['test'] = '123'

    # TODO: get the header info here
    return header;