import dmsite.db_manager.db_manager as db
from .classes import TestDB as TDB

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
    testDB = TDB()
    test = testDB.Table("classifications")
    db.add_item("classifications", test_obj_1, testDB)
    db.add_item("classifications", test_obj_2, testDB)
    db.add_item("classifications", test_obj_3, testDB)

    response = test.response(test_obj_1_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_1)

    response = test.response(test_obj_2_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_2)

    response = test.response(test_obj_3_key)
    assert('Item' in response)
    assert(response['Item'] == test_obj_3)


def test_get():
    testDB = TDB()
    test = testDB.Table("classifications")
    test.put_item(test_obj_1)
    test.put_item(test_obj_2)
    test.put_item(test_obj_3)

    response = db.get_item("classifications", test_obj_1_key, testDB)
    assert('Item' in response)
    assert(response['Item'] == test_obj_1)

    response = db.get_item("classifications", test_obj_2_key, testDB)
    assert('Item' in response)
    assert(response['Item'] == test_obj_2)

    response = db.get_item("classifications", test_obj_3_key, testDB)
    assert('Item' in response)
    assert(response['Item'] == test_obj_3)


def test_query():
    testDB = TDB()
    test = testDB.Table("files")
    test.put_item(test_file_1)
    test.put_item(test_file_2)
    test.put_item(test_file_3)

    response = db.make_query("files", "campaign-index", "campaign", "pytest_campaign", testDB)
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


def test_update():
    testDB = TDB()
    test = testDB.Table("files")
    newArr = [10, 11, 12]
    test.put_item(test_file_1)
    test.put_item(test_file_2)
    test.put_item(test_file_3)

    db.response = db.update_item(
        "files",
        test_file_1_key,
        'set #examples = :values',
        {'#examples': 'examples'},
        {':values': newArr},
        testDB
    )
    db.response = db.update_item(
        "files",
        test_file_2_key,
        'set #examples = :values',
        {'#examples': 'examples'},
        {':values': newArr},
        testDB
    )
    db.response = db.update_item(
        "files",
        test_file_3_key,
        'set #examples = :values',
        {'#examples': 'examples'},
        {':values': newArr},
        testDB
    )

    response = test.response(test_file_1_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)

    response = test.response(test_file_2_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)

    response = test.response(test_file_3_key)
    assert('Item' in response)
    assert('examples' in response['Item'])
    assert(response['Item']['examples'] == newArr)
