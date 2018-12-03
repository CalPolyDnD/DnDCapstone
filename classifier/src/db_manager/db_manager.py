import boto3
import pprint
from decimal import Decimal
import pandas as pd

pp = pprint.PrettyPrinter(indent=4)

dynamodb = boto3.resource('dynamodb')
dynamodb_client = boto3.client('dynamodb')

_HEADERS_TABLE_NAME = 'dataset-headers'


def get_headers_table():
    return dynamodb.Table(_HEADERS_TABLE_NAME)


def get_headers_table_name():
    return _HEADERS_TABLE_NAME


def _conversion_helper(dictionary):
    """
    This method walks through a python dictionary recursively and
     converts types to the appropriate DynamoDB supported type.
    """
    for k, v in dictionary.items():
        if isinstance(v, dict):
            _conversion_helper(v)
            dictionary[k] = {str(k1): v1 for k1, v1 in v.items()}
        elif isinstance(v, float):
            dictionary[k] = Decimal(str(v))

    return dictionary


def _convert_to_dynamodb_types(dataframe):
    """This method is used to convert a Pandas DataFrame into a dictionary that conforms to DynamoDB types"""
    return _conversion_helper(dataframe.to_dict())


def dataframe_from_dynamo_map(dynamo_map):
    """This method is used to convert from a dict using DynamoDB supported types to a Pandas DataFrame"""
    return pd.DataFrame(dynamo_map).apply(pd.to_numeric, errors='ignore')


def put_dataset_header(user_id, dataset_id, dataframe):
    dataframe_as_dict = _convert_to_dynamodb_types(dataframe.head(50))
    data = {str(k1): {str(k2): v2 for k2, v2 in dataframe_as_dict[k1].items()} for k1, v1 in dataframe_as_dict.items()}
    table = dynamodb.Table(_HEADERS_TABLE_NAME)
    table.put_item(
        Item={
            'UserID': user_id,
            'DatasetID': dataset_id,
            'Data': data
        }
    )


def get_dataset_header(user_id, dataset_id):
    table = dynamodb.Table(_HEADERS_TABLE_NAME)
    response = table.get_item(
        Key={
            'UserID': user_id,
            'DatasetID': dataset_id
        }
    )
    data = response['Item']['Data']
    return data
