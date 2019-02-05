from django.http import JsonResponse
import json
import boto3


def create_account(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf-8'))
        result = new_user(data)
        if result['code'] == -1:
            return JsonResponse({"error": result['error']}, status=400)
        return JsonResponse({"success": 1}, status=201)

    return JsonResponse({"error": "not a POST request"}, status=400)


def login(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf-8'))
        result = check_login(data)
        if result['code'] == -1:
            return JsonResponse({"error": result['error']}, status=403)
        return JsonResponse({"success": 1}, status=200)
    return JsonResponse({"error": "not a POST request"}, status=400)


def new_user(data):
    results = {}

    # error: invalid json object
    if any(field not in data for field in('username', 'email', 'password1', 'password2')):
        results['code'] = -1
        results['error'] = "invalid json object"

    # error: passwords do not match
    if data['password1'] != data['password2']:
        results['code'] = -1
        results['error'] = "passwords do not match"
        return results

    dynamodb = boto3.resource('dynamodb')
    users = dynamodb.Table('users')

    # error: username already exists
    try:
        resp = users.get_item(Key={'username': data['username']})
    except BaseException:
        print("Token for boto3 is invalid")
        results['code'] = -1
        results['error'] = "invalid boto token"
        return results

    if 'Item' in resp:
        results['code'] = -1
        results['error'] = "user '" + data['username'] + "' already exists"
        return results

    users.put_item(Item={"username": data['username'], "email": data['email'], "password": data['password1'], "test_fake_key2": 20})
    results['code'] = 0
    return results


def check_login(user):
    results = {}
    results['code'] = -1
    results['error'] = "not yet implemented"
    return results