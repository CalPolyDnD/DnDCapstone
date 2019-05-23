import boto3
from botocore.exceptions import ClientError
import hashlib
import os


s3 = boto3.resource('s3')
BUCKET_NAME = 'datamaster-file-'  # change this to your bucket name
BUCKET_NAME_MAX_LEN = 64 - len(BUCKET_NAME)
bucket_string = None
validBucket = False


def check_bucket():
    global bucket_string
    global validBucket

    if (not validBucket):
        try:
            id = boto3.client('sts').get_caller_identity().get('Account')
            hash_val = hashlib.sha256(id.encode('utf-8')).hexdigest()
            bucket_string = BUCKET_NAME + hash_val
            bucket_string = bucket_string[:BUCKET_NAME_MAX_LEN - 1]

            try:
                s3.meta.client.head_bucket(Bucket=bucket_string)
            except ClientError as e:
                s3.create_bucket(Bucket=bucket_string)

        except ClientError as e:
            print("AWS Error (check_bucket): " + e.__str__())
            return -1
        validBucket = True
    return 0


def upload_file_from_path(path_to_file):
    if (check_bucket() != -1):
        with open(path_to_file, 'rb') as file:
            try:
                s3.Object(bucket_string, os.path.basename(path_to_file)).put(Body=file)
            except ClientError as e:
                print("AWS Error (upload_file_from_path): " + e.__str__())



def upload_file(file, name):
    if (check_bucket() != -1):
        try:
            s3.Object(bucket_string, name.put(Body=file))
        except ClientError as e:
            print("AWS Error (upload_file): " + e.__str__())


def fetch_file(file_name):
    if (check_bucket() != -1):
        filepath = "media/" + file_name
        try:
            s3.Bucket(bucket_string).download_file(file_name, filepath)
        except ClientError as e:
            print("AWS Error (fetch_file): " + e.__str__())
