from django.http import JsonResponse
import dmsite.data_classifier.classifier as c
import dmsite.file_manager.file_manager as FileManager
import json
import os
import boto3

# TODO: remove the csrf_exempts before launching to dev
# adding this here for testing purposes; bypasses cookie needs to access
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def classify_files(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding="utf8"))
        result, status = make_classifications(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse(result, status=200, safe=False)

    return JsonResponse({"error": "not a POST request"}, status=400)


def make_classifications(body):
    #TODO: do some error checking here for stuff
    print(body)
    print("")
    print("")
    clsfr = c.Classifier()
    results = []
    count = 0
    for obj in body:
        filename = obj['filename']
        FileManager.fetch_file(filename)
        filepath = "media/" + filename

        classifications = clsfr.classify(filepath)

        results.append({})
        results[count] = {}
        results[count]['filename'] = filename
        results[count]['classifications'] = []
        for classification in classifications:
            results[count]['classifications'].append(classification.to_json())

        os.remove(filepath)
        count += 1
    status = 0
    return results, status


@csrf_exempt
def save_classifications(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf8'))
        result, status = save_data(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse({"success": 1}, status=203)

    return JsonResponse({"error": "not a POST request"}, status=400)


def save_data(data):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
    classifications = dynamodb.Table("classification")
    files = dynamodb.Table("files")

    try:
        for item in data:
            for classification in item['classifications']:
                response = files.update_item(
                    Key={"filename": item['filename']},
                    UpdateExpression='set #description = :description',
                    ExpressionAttributeNames={'#description': 'description'},
                    ExpressionAttributeValues={':description': item['description']}
                )

                key = {"name": classification['name'], "campaign": classification['campaign']}
                response = classifications.get_item(Key=key)
                if 'Item' not in response:
                    response = classifications.put_item(Item={"name": classification['name'], "campaign": item['campaign'], "examples": classification['examples']})
                else:
                    response = classifications.update_item(
                        Key=key,
                        UpdateExpression='set #classifications = list_append(if_not_exists(#classifications, :empty_list), :values)',
                        ExpressionAttributeNames={'#classifications': 'examples'},
                        ExpressionAttributeValues={
                        ':values': classification['examples'],
                        ':empty_list': []
                    })
    except KeyError as e:
        return {"errorMsg": "invalid json object: " + e.__str__()}, -1

    return {}, 0