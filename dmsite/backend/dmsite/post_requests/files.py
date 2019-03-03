from django.http import JsonResponse
import boto3
from boto3.dynamodb.conditions import Key
import json


#TODO: remove this before pushing to live
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def get_files_by_campaign(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf8'))
        results, status = find_files(data)
        if (status != -1):
             return JsonResponse(results, status=200, safe=False)
        return JsonResponse({"error": results['errorMsg']}, status=400)
    return JsonResponse({"error": "not a POST request"}, status=400)


def find_files(data):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
    files = dynamodb.Table("files")

    response = files.query(IndexName="campaign-index", KeyConditionExpression=Key("campaign").eq(data['campaign']))
    if 'Items' not in response:
        return {"errorMsg": "no files in campaign " + data['campaign']}, -1
    return response['Items'], 0
