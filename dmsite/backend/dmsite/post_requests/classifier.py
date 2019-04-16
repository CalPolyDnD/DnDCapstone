from django.http import JsonResponse
import json
from dmsite.data_classifier.make_classification import make_classifications
from dmsite.data_classifier.make_classification import save_data

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


@csrf_exempt
def save_classifications(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf8'))
        result, status = save_data(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse({"success": 1}, status=203)

    return JsonResponse({"error": "not a POST request"}, status=400)