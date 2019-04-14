import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from decimal import Decimal
import pandas as pd


dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")


def make_query(table, index, value, compare):
    try:
        files = dynamodb.Table(table)
        response = files.query(IndexName=index, KeyConditionExpression=Key(value).eq(compare))
        return response
    except ClientError as e:
        return {"error": "AWS session information is out of date; please contact your system admin to update this info."}


def add_item(table, value):
    try:
        files = dynamodb.Table(table)
        response = files.put_item(Item=value)
        return response
    except ClientError as e:
        return {"error": "AWS session information is out of date; please contact your system admin to update this info."}


def update_item(table, key, update, names, values):
    try:
        tbl = dynamodb.Table(table)
        response = tbl.update_item(Key=key,
                                   UpdateExpression=update,
                                   ExpressionAttributeNames=names,
                                   ExpressionAttributeValues=values
        )
        return response
    except ClientError as e:
        return {"error": "AWS session information is out of date; please contact your system admin to update this info."}


def get_item(table, key):
    try:
        tbl = dynamodb.Table(table)
        response = tbl.get_item(Key=key)
        return response
    except ClientError as e:
        return {"error": "AWS session information is out of date; please contact your system admin to update this info."}


# ----------------------------------------------------------------------------------------------------------------------
# Adds a header frame for the uploaded files
# TODO: add this to file upload


def _conversion_helper(dictionary):

    #This method walks through a python dictionary recursively and
    # converts types to the appropriate DynamoDB supported type.

    for k, v in dictionary.items():
        if isinstance(v, dict):
            _conversion_helper(v)
            dictionary[k] = {str(k1): v1 for k1, v1 in v.items()}
        elif isinstance(v, float):
            dictionary[k] = Decimal(str(v))

    return dictionary


def convert_to_dynamodb_types(dataframe):
    #This method is used to convert a Pandas DataFrame into a dictionary that conforms to DynamoDB types
    return _conversion_helper(dataframe.to_dict())


def dataframe_from_dynamo_map(dynamo_map):
    #This method is used to convert from a dict using DynamoDB supported types to a Pandas DataFrame
    return pd.DataFrame(dynamo_map).apply(pd.to_numeric, errors='ignore')