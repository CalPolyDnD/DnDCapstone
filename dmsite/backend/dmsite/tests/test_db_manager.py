import dmsite.db_manager.db_manager as db
import boto3


dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
files = dynamodb.Table("files")
classifications = dynamodb.Table("classification")


test_obj_1 = {"name": "pytest_name1", "campaign": "pytest_campaign", "examples": [1, 2, 3], "is_sensitive": 1}
test_obj_1_key = {"name": "pytest_name1", "campaign": "pytest_campaign"}
test_obj_2 = {"name": "pytest_name2", "campaign": "pytest_campaign", "examples": [4, 5, 6], "is_sensitive": 1}
test_obj_2_key = {"name": "pytest_name2", "campaign": "pytest_campaign"}
test_obj_3 = {"name": "pytest_name3", "campaign": "pytest_campaign", "examples": [1, 2, 3], "is_sensitive": 0}
test_obj_3_key = {"name": "pytest_name3", "campaign": "pytest_campaign"}

test_file_1 = {"filename": "pytest_file1", "campaign": "pytest_campaign", "examples": [1, 2, 3]}
test_file_1_key = {"filename": "pytest_file1", "campaign": "pytest_campaign"}
test_file_2 = {"filename": "pytest_file2", "campaign": "pytest_campaign", "examples": [4, 5, 6]}
test_file_2_key = {"filename": "pytest_file2", "campaign": "pytest_campaign"}
test_file_3 = {"filename": "pytest_file3", "campaign": "pytest_campaign", "examples": [7, 8, 9]}
test_file_3_key = {"filename": "pytest_file3", "campaign": "pytest_campaign"}


def test_add():
    db.add_item("classification", test_obj_1)
    db.add_item("classification", test_obj_2)
    db.add_item("classification", test_obj_3)

    response = classifications.get_item(Key=test_obj_1_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_1)

    response = classifications.get_item(Key=test_obj_2_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_2)

    response = classifications.get_item(Key=test_obj_3_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_3)

    classifications.delete_item(Key=test_obj_1_key)
    classifications.delete_item(Key=test_obj_2_key)
    classifications.delete_item(Key=test_obj_3_key)


def test_get():
    classifications.put_item(Item=test_obj_1)
    classifications.put_item(Item=test_obj_2)
    classifications.put_item(Item=test_obj_3)

    response = db.get_item("classification", test_obj_1_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_1)

    response = db.get_item("classification", test_obj_2_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_2)

    response = db.get_item("classification", test_obj_3_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_3)

    classifications.delete_item(Key=test_obj_1_key)
    classifications.delete_item(Key=test_obj_2_key)
    classifications.delete_item(Key=test_obj_3_key)


def test_query():
    files.put_item(Item=test_file_1)
    files.put_item(Item=test_file_2)
    files.put_item(Item=test_file_3)

    response = db.make_query("files", "campaign-index", "campaign", "pytest_campaign")
    assert('Items' in response)
    if (response['Items'][0] == test_file_1 or response['Items'][1] == test_file_1 or response['Items'][2] == test_file_1):
        resp1 = True
    else:
        resp1 = False
    assert(resp1 == True)
    if (response['Items'][0] == test_file_2 or response['Items'][1] == test_file_2 or response['Items'][2] == test_file_2):
        resp2 = True
    else:
        resp2 = False
    assert(resp2 == True)
    if (response['Items'][0] == test_file_3 or response['Items'][1] == test_file_3 or response['Items'][2] == test_file_3):
        resp3 = True
    else:
        resp3 = False
    assert(resp3 == True)

    files.delete_item(Key=test_file_1_key)
    files.delete_item(Key=test_file_2_key)
    files.delete_item(Key=test_file_3_key)


def test_update():
    newArr = [10, 11, 12]
    files.put_item(Item=test_file_1)
    files.put_item(Item=test_file_2)
    files.put_item(Item=test_file_3)

    db.response = db.update_item(
        "files",
        test_file_1_key,
        'set #examples = :value',
        {'#examples': 'examples'},
        {':value': newArr}
    )
    db.response = db.update_item(
        "files",
        test_file_2_key,
        'set #examples = :value',
        {'#examples': 'examples'},
        {':value': newArr}
    )
    db.response = db.update_item(
        "files",
        test_file_3_key,
        'set #examples = :value',
        {'#examples': 'examples'},
        {':value': newArr}
    )

    response = files.get_item(Key=test_file_1_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)

    response = files.get_item(Key=test_file_2_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)

    response = files.get_item(Key=test_file_3_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)

    files.delete_item(Key=test_file_1_key)
    files.delete_item(Key=test_file_2_key)
    files.delete_item(Key=test_file_3_key)


def test_out_of_date_credentials():
    # NOTE: this test is here to ensure that the program doesn't crash if credentials are out of date, so if this test
    # fails, then there's an error with how exceptions are handled within the server

    response = db.get_item("files", {"filename": "non-exist", "campaign": "bad_campaign"})
    assert True
