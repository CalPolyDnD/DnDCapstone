import os
import pandas as pd
from django.http import HttpResponseRedirect
import dmsite.file_manager.file_manager as fm
import dmsite.db_manager.db_manager as db

ROWS = 15

# TODO: remove the csrf_exempts before launching to dev
# adding this here for testing purposes; bypasses cookie needs to access
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        for k, v in request.FILES.items():
            handle_uploaded_file(v, request.META)
        return HttpResponseRedirect('/home')
    else:
        return HttpResponseRedirect('/home')


def handle_uploaded_file(f, h):
    f_name = "media/" + f.name
    if not os.path.exists("media"):
        os.mkdir("media")
    with open(f_name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    header = db.convert_to_dynamodb_types(pd.read_csv(f_name).head(ROWS))
    handle_file_upload_data({'name': f.name, 'campaign': h['HTTP_CAMPAIGN'], 'labels': header})

    fm.upload_file_from_path(f_name)
    os.remove(f_name)


def handle_file_upload_data(data):
    try:
        db.add_item("files",
                    {"filename": data['name'], "campaign": data['campaign'], "classifications": [],
                     "description": "None",
                     "is_classified": 0, "labels": data['labels']})
    except KeyError as e:
        return {"errorMsg": "invalid json format"}, -1
    return {"success": 1}, 0