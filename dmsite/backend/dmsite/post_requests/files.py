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
