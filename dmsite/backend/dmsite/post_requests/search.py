from django.http import JsonResponse
import json


def perform_search(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding='utf-8'))
        results = make_search(data)
        if results is None:
            return JsonResponse({"error": "invalid search JSON"}, status=400)
        return JsonResponse(results, status=201)
    return JsonResponse({"error": "not a POST request"}, status=400)


def make_search(data):
    # TODO: do actual search processing here
    return data

