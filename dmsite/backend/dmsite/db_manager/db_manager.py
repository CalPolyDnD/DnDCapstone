import boto3
import pprint
from decimal import Decimal
import pandas as pd


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
