from django.http import HttpResponseRedirect
from dmsite.upload.upload import handle_uploaded_file


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