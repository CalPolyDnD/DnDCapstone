import os
from django.http import HttpResponseRedirect
from django.shortcuts import render
import dmsite.file_manager.file_manager as fm

def upload_file(request):
    if request.method == 'POST':
        for k, v in request.FILES.items():
            handle_uploaded_file(v)
        return HttpResponseRedirect('/home')
    else:
        return HttpResponseRedirect('/home')


def handle_uploaded_file(f):
    fName = "media/" + f.name
    if not os.path.exists("media"):
        os.mkdir("media")
    with open(fName, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    fm.upload_file_from_path(fName)
    os.remove(fName)
