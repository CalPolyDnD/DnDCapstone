from django.http import JsonResponse


def create_account(request):
    # steven edit this
    if request.method == 'POST':
        # success - do login
        print('success')
      
    return JsonResponse({"error": "not a POST request"}, status=403)
