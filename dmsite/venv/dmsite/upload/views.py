import os
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
import dmsite.file_manager.file_manager as fm
import dmsite.db_manager.db_manager as dbm
import dmsite.data_classifier.data_wrangler as dw


# Imaginary function to handle an uploaded file.

def upload_file(request):
    if request.method == 'POST':
        for k, v in request.FILES.items():
            handle_uploaded_file(v)
        return HttpResponseRedirect('/')
    else:
        form = UploadFileForm()
    return render(request, 'index.html', {'form': form})

def handle_uploaded_file(f):
    fName = "media/" + f.name
    if not os.path.exists("media"):
        os.mkdir("media")
    with open(fName, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    file = open(fName, 'rb')

    parser = dw.Wrangler(file, ".csv")
    parser.parse_file()
    dbm.put_dataset_header("userName", f.name, parser.data)

    fm.upload_file_from_path(fName)
    os.remove(fName)