from django.http import JsonResponse
import json
from dmsite.edits import edits


# TODO: remove the csrf_exempts before launching to dev
# adding this here for testing purposes; bypasses cookie needs to access
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def get_classifications(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding="utf8"))
        result, status = edits.get_classifications(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse(result, status=200, safe=False)

    return JsonResponse({"error": "not a POST request"}, status=400)


# TODO: remove the csrf_exempts before launching to dev
# adding this here for testing purposes; bypasses cookie needs to access
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def save_classifications(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding="utf8"))
        result, status = edits.save_classifications(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse(result, status=200, safe=False)

    return JsonResponse({"error": "not a POST request"}, status=400)
