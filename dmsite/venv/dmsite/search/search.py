from rest_framework.parsers import JSONParser
from django.http import JsonResponse


def perform_search(request):
    if request.method == 'POST':
        print("Performing search post...")
        data = JSONParser().parse(request)
        results = make_search(data)
        return JsonResponse(data, status=201)

    return JsonResponse({"error": "not a post"}, status=400)


def make_search(data):
    return data


