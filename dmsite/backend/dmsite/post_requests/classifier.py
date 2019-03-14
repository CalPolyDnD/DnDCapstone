from django.http import JsonResponse
import dmsite.data_classifier.classifier as c
import dmsite.file_manager.file_manager as fm
import dmsite.db_manager.db_manager as db
import json
import os

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
    clsfr = c.Classifier()
    results = []
    count = 0
    try:
        for obj in body:
            filename = obj['filename']
            fm.fetch_file(filename)
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
    except KeyError as e:
        return {"errorMsg": "invalid json object - " + e.__str__()}, -1
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
    try:
        for item in data:
            names = []
            if 'description' not in item:
                item['description'] = "Placeholder Description"

            for classification in item['classifications']:
                if 'is_sensitive' not in classification:
                    classification['is_sensitive'] = 0
                key = {"name": classification['name'], "campaign": item['campaign']}
                response = db.get_item("classification", key)
                if 'Item' not in response:
                    response = db.add_item("classification", {"name": classification['name'], "campaign": item['campaign'],
                                                              "examples": classification['examples'], "is_sensitive": classification['is_sensitive']})
                else:
                    response = db.update_item(
                        "classification",
                        key,
                        'set #classifications = list_append(if_not_exists(#classifications, :empty_list), :values)',
                        {'#classifications': 'examples'},
                        {':values': classification['examples'], ':empty_list': []}
                    )
                names.append({"name": classification['name'], "is_sensitive": classification["is_sensitive"]})

            response = db.update_item(
                "files",
                {"filename": item['filename'], 'campaign': item['campaign']},
                'set #description = :description',
                {'#description': 'description'},
                {':description': item['description']}
            )
            response = db.update_item(
                "files",
                {"filename": item['filename'], 'campaign': item['campaign']},
                'set #classifications = list_append(if_not_exists(#classifications, :empty_list), :values)',
                {'#classifications': 'classifications'},
                {':values': names, ':empty_list': []}
            )
            response = db.update_item(
                "files",
                {"filename": item['filename'], 'campaign': item['campaign']},
                'set #is_classified = :value',
                {'#is_classified': 'is_classified'},
                {':value': 1}
            )

    except KeyError as e:
        return {"errorMsg": "invalid json object: " + e.__str__()}, -1

    return {}, 0