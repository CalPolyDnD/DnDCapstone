import os
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
from dmsite.file_manager import file_manager as fm

# Imaginary function to handle an uploaded file.

def upload_file(request):
    if request.method == 'POST':
        handle_uploaded_file(request.FILES['datafile'])
        return HttpResponseRedirect('/upload/')
    else:
        form = UploadFileForm()
    return render(request, 'index.html', {'form': form})

def handle_uploaded_file(f):
    fName = "media/" + f.name
    with open(fName, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    fm.upload_file_from_path(fName)
    os.remove(fName)