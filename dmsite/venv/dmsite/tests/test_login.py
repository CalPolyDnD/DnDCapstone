import boto3
from dmsite.authentication import login

dynamodb = boto3.resource('dynamodb')
users = dynamodb.Table('users')


def run_test_suite():
    test_valid_new_user()
    test_duplicate_user()
    test_bad_password_match()
    test_invalid_json()


def test_valid_new_user():
    new_user = {"username": "new_user", "email": "user@userSite.com", "password1": "pass", "password2": "pass"}
    result = login.new_user(new_user)
    assert(result['code'] == 0)
    users.delete_item(Key={"username": "new_user"})


def test_duplicate_user():
    test_user_1 = {"username": "test", "email": "test@email.com", "password": "hello123"}
    users.put_item(Key=test_upyser_1)
    new_user = {"username": "test", "email": "user@userSite.com", "password1": "pass", "password2": "pass"}
    result = login.new_user(new_user)
    assert(result['code'] == -1 & result['error'] == "user 'test' already exists")
    users.delete_item(Key=test_user_1)


def test_bad_password_match():
    new_user = {"username": "new_user", "email": "user@userSite.com", "password1": "pass", "password2": "passA"}
    result = login.new_user(new_user)
    assert(result['code'] == -1 & result['error'] == "passwords do not match")


def test_invalid_json():
    no_un = {"email": "user@userSite.com", "password1": "pass", "password2": "pass"}
    no_em = {"username": "new_user", "password1": "pass", "password2": "pass"}
    no_pw1 = {"username": "new_user", "email": "user@userSite.com", "password2": "pass"}
    no_pw2 = {"username": "new_user", "email": "user@userSite.com", "password1": "pass"}
    result = login.new_user(no_un)
    assert (result['code'] == -1 & result['error'] == "invalid json object")
    result = login.new_user(no_em)
    assert (result['code'] == -1 & result['error'] == "invalid json object")
    result = login.new_user(no_pw1)
    assert (result['code'] == -1 & result['error'] == "invalid json object")
    result = login.new_user(no_pw2)
    assert (result['code'] == -1 & result['error'] == "invalid json object")


if __name__ == "__main__":
    run_test_suite()