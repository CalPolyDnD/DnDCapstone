import dmsite.data_classifier.classifier as dc
import dmsite.data_classifier.make_classification as classifier
import boto3


dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
files = dynamodb.Table("files")
classifications = dynamodb.Table("classification")


first = {"is_sensitive": 1, "name": "test_classificaion_1", "examples": [1, 2, 3]}
second = {"is_sensitive": 0, "name": "test_classificaion_2", "examples": [4, 5, 6]}
third = {"is_sensitive": 1, "name": "test_classificaion_3", "examples": [7, 8, 9]}
fourth = {"is_sensitive": 1, "name": "test_classification_4", "examples": [10, 11, 12]}
c1 = [first, second, third]
o1 = {"description": "This is the first one!", "classifications": c1, "campaign": "test_campaign", "filename": "one"}

modified_second = {"name": "test_classificaion_4", "examples": [13, 14, 15]}
c2 = [modified_second]
o2 = {"description": "This is the second one!", "classifications": c2, "campaign": "test_campaign", "filename": "two"}

modified_first = {"is_sensitive": 1, "name": "test_classificaion_1", "examples": [16, 17, 18]}
c3 = [first, modified_first]
o3 = {"description": "This is the third one!", "classifications": c3, "campaign": "test_campaign", "filename": "three"}

c4 = [fourth]
o4 = {"classifications": c4, "campaign": "test_campaign", "filename": "four"}


def test_classification_eq():
    c1 = dc.Classification('classification1')
    c2 = dc.Classification('classification1')
    c3 = dc.Classification('classification2')

    assert(c1 == c2)
    assert(c1 != c3)


def test_save_new_classifications():
    tF = first
    tF['campaign'] = "test_campaign"
    fKey = {"name": "test_classificaion_1", "campaign": "test_campaign"}
    tS = second
    tS['campaign'] = "test_campaign"
    sKey = {"name": "test_classificaion_2", "campaign": "test_campaign"}
    tT = third
    tT['campaign'] = "test_campaign"
    tKey = {"name": "test_classificaion_3", "campaign": "test_campaign"}
    fileKey = {"filename": "one", "campaign": "test_campaign"}

    classifier.save_data([o1])
    response = classifications.get_item(Key=fKey)
    assert ('Item' in response)
    assert (response['Item'] == tF)
    response = classifications.get_item(Key=sKey)
    assert ('Item' in response)
    assert (response['Item'] == tS)
    response = classifications.get_item(Key=tKey)
    assert ('Item' in response)
    assert (response['Item'] == tT)

    classifications.delete_item(Key=fKey)
    classifications.delete_item(Key=sKey)
    classifications.delete_item(Key=tKey)
    files.delete_item(Key=fileKey)


def test_save_missing_sensitive():
    ckey = {"name": "test_classificaion_4", "campaign": "test_campaign"}
    fkey = {"filename": "two", "campaign": "test_campaign"}

    classifier.save_data([o2])
    response = classifications.get_item(Key=ckey)
    assert ('Item' in response)
    assert ('is_sensitive' in response['Item'])
    assert (response['Item']['is_sensitive'] == 0)

    classifications.delete_item(Key=ckey)
    files.delete_item(Key=fkey)


def test_save_append():
    fkey = {"filename": "three", "campaign": "test_campaign"}
    ckey = {"name": "test_classificaion_1", "campaign": "test_campaign"}
    newArr = [1, 2, 3, 16, 17, 18]

    classifier.save_data([o3])
    response = classifications.get_item(Key=ckey)
    assert ('Item' in response)
    assert ('examples' in response['Item'])
    assert (response['Item']['examples'] == newArr)

    classifications.delete_item(Key=ckey)
    files.delete_item(Key=fkey)


def test_save_no_description():
    fkey = {"filename": "four", "campaign": "test_campaign"}
    ckey = {"name": "test_classification_4", "campaign": "test_campaign"}

    classifier.save_data([o4])
    response = files.get_item(Key=fkey)
    assert('Item' in response)
    assert('description' in response['Item'])
    assert(response['Item']['description'] == "Placeholder Description")

    classifications.delete_item(Key=ckey)
    files.delete_item(Key=fkey)


# This test fails is the program throws an error
def test_classification_invalid():
    classifier.make_classifications({})


# This test fails is the program throws an error
def test_save_invalid():
    classifier.save_data([{}])
