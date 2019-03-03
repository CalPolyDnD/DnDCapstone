from django.http import JsonResponse
import boto3
from boto3.dynamodb.conditions import Key
import json


#TODO: remove this before pushing to live
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def get_campaigns_by_owner(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf8'))
        results, status = find_campaigns(data)
        if (status != -1):
             return JsonResponse(results, status=200, safe=False)
        return JsonResponse({"error": results['errorMsg']}, status=400)
    return JsonResponse({"error": "not a POST request"}, status=400)


def find_campaigns(data):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
    files = dynamodb.Table("campaigns")

    response = files.query(IndexName="owner-index", KeyConditionExpression=Key("owner").eq(data['owner']))
    if 'Items' not in response:
        return {"errorMsg": "no campaigns owned by " + data['owner']}, -1
    print(response['Items'])
    return response['Items'], 0