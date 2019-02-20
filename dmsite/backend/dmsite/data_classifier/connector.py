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
        result, status = make_classifications(data)
        if status == -1:
            return JsonResponse({"error": result['errorMsg']}, status=400)
        return JsonResponse(result, status=200, safe=False  )

    return JsonResponse({"error": "not a POST request"}, status=400)


def make_classifications(body):
    clsfr = c.Classifier
    clsfr.__init__(clsfr)
    results = []
    count = 0
    for obj in body:
        filename = obj['filename']
        FileManager.fetch_file(filename)
        filepath = "media/" + filename

        classifications = clsfr.classify(clsfr, filepath)

        results.append({})
        results[count] = {}
        results[count]['filename'] = filename
        results[count]['classifications'] = []
        for classification in classifications:
            results[count]['classifications'].append(classification.to_json())

        os.remove(filepath)
        count += 1;
    status = 0
    return results, status