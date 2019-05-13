import dmsite.data_classifier.classifier as dc
import dmsite.data_classifier.make_classification as classifier
from .classes import TestDB as TDB


OWNER = "test_owner"
CAMPAIGN = "test_campaign"

first = {"is_sensitive": 1, "name": "test_classificaion_1", "examples": [1, 2, 3]}
second = {"is_sensitive": 0, "name": "test_classificaion_2", "examples": [4, 5, 6]}
third = {"is_sensitive": 1, "name": "test_classificaion_3", "examples": [7, 8, 9]}
fourth = {"is_sensitive": 1, "name": "test_classification_4", "examples": [10, 11, 12]}
c1 = [first, second, third]
o1 = {"description": "This is the first one!", "classifications": c1, "campaign": CAMPAIGN, "filename": "one", "owner": OWNER}

modified_second = {"name": "test_classificaion_4", "examples": [13, 14, 15]}
c2 = [modified_second]
o2 = {"description": "This is the second one!", "classifications": c2, "campaign": CAMPAIGN, "filename": "two", "owner": OWNER}

modified_first = {"is_sensitive": 1, "name": "test_classificaion_1", "examples": [16, 17, 18]}
c3 = [first, modified_first]
o3 = {"description": "This is the third one!", "classifications": c3, "campaign": CAMPAIGN, "filename": "three", "owner": OWNER}

c4 = [fourth]
o4 = {"classifications": c4, "campaign": CAMPAIGN, "filename": "four", "owner": OWNER}



def test_classification_eq():
    c1 = dc.Classification('classification1')
    c2 = dc.Classification('classification1')
    c3 = dc.Classification('classification2')

    assert(c1 == c2)
    assert(c1 != c3)


def test_save_new_classifications():
    db = TDB()
    if db is None:
        print("db is none")
    tF = first
    tF['campaign'] = CAMPAIGN
    tF['owner'] = OWNER
    fKey = {"name": "test_classificaion_1", "campaign": "test_campaign"}
    tS = second
    tS['campaign'] = CAMPAIGN
    tS['owner'] = OWNER
    sKey = {"name": "test_classificaion_2", "campaign": "test_campaign"}
    tT = third
    tT['campaign'] = CAMPAIGN
    tT['owner'] = OWNER
    tKey = {"name": "test_classificaion_3", "campaign": "test_campaign"}

    classifier.save_data([o1], db)
    response = db.response(fKey)
    assert ('Item' in response)
    assert (response['Item'] == tF)
    response = db.response(sKey)
    assert ('Item' in response)
    assert (response['Item'] == tS)
    response = db.response(tKey)
    assert ('Item' in response)
    assert (response['Item'] == tT)


def test_save_missing_sensitive():
    db = TDB()
    ckey = {"name": "test_classificaion_4", "campaign": "test_campaign"}

    classifier.save_data([o2], db)
    response = db.response(ckey)
    assert ('Item' in response)
    assert ('is_sensitive' in response['Item'])
    assert (response['Item']['is_sensitive'] == 0)


def test_save_append():
    db = TDB()
    ckey = {"name": "test_classificaion_1", "campaign": "test_campaign"}
    newArr = [1, 2, 3, 16, 17, 18]

    classifier.save_data([o3], db)
    response = db.response(ckey)
    assert ('Item' in response)
    assert ('examples' in response['Item'])
    assert (response['Item']['examples'] == newArr)



def test_save_no_description():
    db = TDB()
    fkey = {"filename": "four", "campaign": "test_campaign"}
    db.tbl.data.append({'Item': {'description': "Placeholder Description", 'filename': "four"}})

    classifier.save_data([o4], db)
    response = db.response(fkey)
    assert('Item' in response)
    assert('description' in response['Item'])
    assert(response['Item']['description'] == "Placeholder Description")
