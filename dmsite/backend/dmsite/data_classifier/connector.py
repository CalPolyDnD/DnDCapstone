from django.http import JsonResponse
import dmsite.data_classifier.classifier as c
import dmsite.file_manager.file_manager as FileManager
import json
import os

# adding this here for testing purposes; bypasses cookie needs to access
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def classify_files(request):
    if request.method == 'POST':
        data = json.loads(str(request.body, encoding="utf8"))
        result = make_classifications(data)
        if result['status'] == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse(result, status=200)

    return JsonResponse({"error": "not a POST request"}, status=400)


def make_classifications(body):
    filename = body['filename']
    FileManager.fetch_file(filename)
    filepath = "media/" + filename

    print("classifying")
    clsfr = c.Classifier
    clsfr.__init__(clsfr)
    classifications = clsfr.classify(clsfr, filepath)

    results = {}
    results['filename'] = filename
    results['classifications'] = []
    for classification in classifications:
        results['classifications'].append(classification.to_json())

    results['status'] = 0
    os.remove(filepath)
    return results