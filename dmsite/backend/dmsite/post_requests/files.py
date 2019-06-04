from django.http import JsonResponse
import dmsite.db_manager.db_manager as db
import json


#TODO: remove this before pushing to live
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def get_files_by_campaign(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf8'))
        results, status = find_files(data)
        if status != -1:
            return JsonResponse(results, status=200, safe=False)
        return JsonResponse({"error": results['errorMsg']}, status=400)
    return JsonResponse({"error": "not a POST request"}, status=400)

def find_files(data):
    response = db.make_query("files", "campaign-index", "campaign", data['campaign'])
    if 'Items' not in response:
        return {"errorMsg": "no files in campaign " + data['campaign']}, -1

    return response['Items'], 0

@csrf_exempt
def download_file(request):
    if request.method == 'POST':
        try:
            requestBody = json.loads(str(request.body, encoding='utf8'))
            data = db.scan('classifications', 'campaign', requestBody['campaign_name'])
            if 'Items' not in data:
                return JsonResponse({"error": data['errorStr']}, status=400)
            formattedResponse = formatClassificationJson(data['Items'])
            response = JsonResponse(formattedResponse, status=200)
            return response
        except Exception as e:
            print(e)
            return JsonResponse({"error": e}, status=400)
    return JsonResponse({"error": "not a POST request"}, status=400)

def formatClassificationJson(classifications):
    results = {}
    if not classifications:
        return results

    for classification in classifications:
        classificationObject = {
            'campaign': classification['campaign'],
            'examples': classification['examples'],
            'is_sensitive': classification['is_sensitive'],
        }
        results[classification['name']] = classificationObject

    return results

#TODO: add a POST request to update a file's description
