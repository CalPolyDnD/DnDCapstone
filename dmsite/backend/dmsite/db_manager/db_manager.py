import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from decimal import Decimal
import pandas as pd


dynamo_client = boto3.client('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
ERR_STR = "There was an error trying to access the AWS database. See 'errorStr' for details."

THROUGHPUT = {
   "ReadCapacityUnits": 5,
   "WriteCapacityUnits": 5,
}

FILE_TABLE = "files"
CLASS_TABLE = "classifications"
CAMP_TABLE = "campaigns"

FILE_ATTRIBUTES = [
   {
      "AttributeName": "filename",
      "AttributeType": "S",
   },
   {
      "AttributeName": "campaign",
      "AttributeType": "S",
   },
]
FILE_SCHEMA = [
   {
      "AttributeName": "filename",
      "KeyType": "HASH"
   },
   {
      "AttributeName": "campaign",
      "KeyType": "RANGE",
   }
]
FILE_INDEX = [
   {
      "IndexName": "campaign-index",
      "KeySchema": [
         {
            "AttributeName": "campaign",
            "KeyType": "HASH"
         }
      ],
      "Projection": {
         "ProjectionType": "ALL",
      },
      "ProvisionedThroughput": THROUGHPUT
   }
]

CLASS_ATTRIBUTES = [
   {
      "AttributeName": "name",
      "AttributeType": "S",
   },
   {
      "AttributeName": "campaign",
      "AttributeType": "S",
   }
]
CLASS_SCHEMA = [
   {
      "AttributeName": "name",
      "KeyType": "HASH"
   },
   {
      "AttributeName": "campaign",
      "KeyType": "RANGE",
   }
]
CLASS_INDEX = [
   {
      "IndexName": "campaign-index",
      "KeySchema": [
         {
            "AttributeName": "campaign",
            "KeyType": "HASH"
         }
      ],
      "Projection": {
         "ProjectionType": "ALL",
      },
      "ProvisionedThroughput": THROUGHPUT
   }
]

CAMP_ATTRIBUTES = [
   {
      "AttributeName": "name",
      "AttributeType": "S",
   },
   {
      "AttributeName": "owner",
      "AttributeType": "S",
   }
]
CAMP_SCHEMA = [
   {
      "AttributeName": "name",
      "KeyType": "HASH"
   },
   {
      "AttributeName": "owner",
      "KeyType": "RANGE",
   }
]
CAMP_INDEX = [
   {
      "IndexName": "owner-index",
      "KeySchema": [
         {
            "AttributeName": "owner",
            "KeyType": "HASH"
         }
      ],
      "Projection": {
         "ProjectionType": "ALL",
      },
      "ProvisionedThroughput": THROUGHPUT
   }
]


db_status = False


def check_db():
    try:
        tables = dynamo_client.list_tables()
        if FILE_TABLE not in tables['TableNames']:
            print("-----> File table is being created...")
            dynamo_client.create_table(AttributeDefinitions=FILE_ATTRIBUTES,
                                       TableName=FILE_TABLE,
                                       KeySchema=FILE_SCHEMA,
                                       GlobalSecondaryIndexes=FILE_INDEX,
                                       BillingMode="PROVISIONED",
                                       ProvisionedThroughput=THROUGHPUT)

            response = dynamo_client.describe_table(TableName=FILE_TABLE)
            while response['Table']['TableStatus'] != 'ACTIVE':
                response = dynamo_client.describe_table(TableName=FILE_TABLE)

        if CLASS_TABLE not in tables['TableNames']:
            print("-----> Classification table is being created...")
            dynamo_client.create_table(AttributeDefinitions=CLASS_ATTRIBUTES,
                                       TableName=CLASS_TABLE,
                                       KeySchema=CLASS_SCHEMA,
                                       GlobalSecondaryIndexes=CLASS_INDEX,
                                       BillingMode="PROVISIONED",
                                       ProvisionedThroughput=THROUGHPUT)
            response = dynamo_client.describe_table(TableName=FILE_TABLE)
            while response['Table']['TableStatus'] != 'ACTIVE':
                response = dynamo_client.describe_table(TableName=CLASS_TABLE)

        if CAMP_TABLE not in tables['TableNames']:
            print("-----> Campaign table is being created...")
            dynamo_client.create_table(AttributeDefinitions=CAMP_ATTRIBUTES,
                                       TableName=CAMP_TABLE,
                                       KeySchema=CAMP_SCHEMA,
                                       GlobalSecondaryIndexes=CAMP_INDEX,
                                       BillingMode="PROVISIONED",
                                       ProvisionedThroughput=THROUGHPUT)
            response = dynamo_client.describe_table(TableName=CAMP_TABLE)
            while response['Table']['TableStatus'] != 'ACTIVE':
                response = dynamo_client.describe_table(TableName=FILE_TABLE)

        print("-----> AWS Database ready!")
        global db_status
        db_status = True
        return 0, {}
    except ClientError as e:
        print("AWS Error (check_tables): " + e.__str__())
        return -1, {"error": ERR_STR, "errorStr": e.__str__()}


def make_query(table, index, value, compare):
    if db_status is False:
        status, resp = check_db()
        if status is -1:
            return resp
    try:
        files = dynamodb.Table(table)
        response = files.query(IndexName=index, KeyConditionExpression=Key(value).eq(compare))
        return response
    except ClientError as e:
        print("AWS Error (make_query): " + e.__str__())
        return {"error": ERR_STR, "errorStr": e.__str__()}


def add_item(table, value):
    if db_status is False:
        status, resp = check_db()
        if status is -1:
            return resp
    try:
        files = dynamodb.Table(table)
        response = files.put_item(Item=value)
        return response
    except ClientError as e:
        print("AWS Error (add_item): " + e.__str__())
        return {"error": ERR_STR, "errorStr": e.__str__()}


def update_item(table, key, update, names, values):
    if db_status is False:
        status, resp = check_db()
        if status is -1:
            return resp
    try:
        tbl = dynamodb.Table(table)
        response = tbl.update_item(Key=key,
                                   UpdateExpression=update,
                                   ExpressionAttributeNames=names,
                                   ExpressionAttributeValues=values
        )
        return response
    except ClientError as e:
        print("AWS Error (update_tem): " + e.__str__())
        return {"error": ERR_STR, "errorStr": e.__str__()}


def get_item(table, key):
    if db_status is False:
        status, resp = check_db()
        if status is -1:
            return resp
    try:
        tbl = dynamodb.Table(table)
        response = tbl.get_item(Key=key)
        return response
    except ClientError as e:
        print("AWS Error (get_item): " + e.__str__())
        return {"error": ERR_STR, "errorStr": e.__str__()}

def get_table(table):
    if db_status is False:
        status, resp = check_db()
        if status is -1:
            return resp
    try:
        table = dynamodb.Table(table)
        response = table.scan()
        data = response['Items']

        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response['Items'])
        return data
    except ClientError as e:
        print("AWS Error (scan): " + e.__str__())
        return {"error": ERR_STR, "errorStr": e.__str__()}
      
# ----------------------------------------------------------------------------------------------------------------------
# Adds a header frame for the uploaded files
# TODO: add this to file upload


def _conversion_helper(dictionary):

    # This method walks through a python dictionary recursively and
    # converts types to the appropriate DynamoDB supported type.

    for k, v in dictionary.items():
        if isinstance(v, dict):
            _conversion_helper(v)
            dictionary[k] = {str(k1): v1 for k1, v1 in v.items()}
        elif isinstance(v, float):
            dictionary[k] = Decimal(str(v))

    return dictionary


def convert_to_dynamodb_types(dataframe):
    # This method is used to convert a Pandas DataFrame into a dictionary that conforms to DynamoDB types
    return _conversion_helper(dataframe.to_dict())


def dataframe_from_dynamo_map(dynamo_map):
    # This method is used to convert from a dict using DynamoDB supported types to a Pandas DataFrame
    return pd.DataFrame(dynamo_map).apply(pd.to_numeric, errors='ignore')
