"""dmsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

# Use include() to add paths from the catalog application
from django.urls import include
from django.urls import path
from django.urls import re_path

# TODO: remove this once dev is done, or before releases
# Use static() to add url mapping to serve static files during development (only)
from django.conf import settings
from django.conf.urls.static import static

# Used to display templates
from django.urls import path
from django.views.generic import TemplateView

# Local addons
from dmsite.upload import views as upload_views
from dmsite.search import search
from dmsite.authentication import login
from dmsite.file_manager import file_manager

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('home/upload/push_file', upload_views.upload_file),
    path('search/push_query', search.perform_search),
    path('details/get_file', file_manager.get_file_details),
    path('dataset_sample', file_manager.get_dataset_header),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

    # leave this just incase ^^ stops working
    #path('', TemplateView.as_view(template_name='index.html')),
    #path('home', TemplateView.as_view(template_name='index.html')),
    #path('search/*', TemplateView.as_view(template_name='index.html')),
    #path('home/upload', TemplateView.as_view(template_name='index.html')),
    #path('details', TemplateView.as_view(template_name='index.html')),
    #path('profile', TemplateView.as_view(template_name='index.html')),
    #path('register', TemplateView.as_view(template_name='index.html')),
    #path('login', TemplateView.as_view(template_name='index.html'))
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
