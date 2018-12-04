import db_manager.db_manager as dbm
import pandas as pd
from botocore.exceptions import ClientError

testUserID = 'testUser'


def test_dataset_conversion():
    df_expected = pd.DataFrame({
        "COUNT AMERICAN INDIAN": {
          "0": 0,
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0
        },
        "PERCENT AMERICAN INDIAN": {
          "0": 0.5,
          "1": 0.5,
          "2": 0.5,
          "3": 0.5,
          "4": 0.3,
          "5": 0.3,
          "6": 0.3,
          "7": 0.1,
          "8": 0.1,
          "9": 0.1
        }
    })

    df_actual = pd.DataFrame(dbm._convert_to_dynamodb_types(df_expected)).apply(pd.to_numeric, errors='ignore')

    assert pd.DataFrame.equals(df_expected, df_actual)


def test_dataset_header_table_exists():
    try:
        dbm.dynamodb_client.describe_table(TableName=dbm.get_headers_table_name())
        assert True
    except dbm.dynamodb_client.exceptions.ResourceNotFoundException:
        assert False


def test_get_dataset_header():
    actual = dbm.get_dataset_header('testUser', 'testDataset')

    expected = {
        "Table1": [{"id": 0, "item": "item 0"},
                   {"id": 1, "item": "item 1"}]
    }
    assert actual == expected


def test_put_dataset_header():
    try:
        dbm.get_headers_table().delete_item(
            Key={
                'UserID': testUserID,
                'DatasetID': 'testInsertItem'
            }
        )
    except ClientError:
        raise

    data = pd.DataFrame({
        "Table1": [{"id": 0, "item": "item 0"},
                   {"id": 1, "item": "item 1"}]
    })

    dbm.put_dataset_header(testUserID, 'testInsertItem', data)

    result = dbm.get_headers_table().get_item(
        Key={
            'UserID': testUserID,
            'DatasetID': 'testInsertItem'
        }
    )
    assert result.get('Item')
