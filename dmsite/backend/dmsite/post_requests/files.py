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


def download_file(request):
    if request.method == 'GET':
        try:
            data = db.get_table('classifications')
            if 'error' in data:
                return JsonResponse({"error": data['errorStr']}, status=400)
            response = JsonResponse({"Items": data}, status=200)
            return response
        except Exception as e:
            print(e)
            return JsonResponse({"error": e}, status=400)
    return JsonResponse({"error": "not a POST request"}, status=400)
#TODO: add a POST request to update a file's description
