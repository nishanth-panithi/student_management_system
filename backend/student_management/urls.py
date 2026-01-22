"""
URL configuration for student_management project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def root_view(request):
    """Root endpoint providing API information."""
    return JsonResponse({
        'message': 'Student Management System API',
        'version': '1.0.0',
        'endpoints': {
            'admin': '/admin/',
            'api_auth': '/api/auth/',
            'api_students': '/api/students/',
        },
        'documentation': 'See README.md for API documentation'
    })

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('students.auth_urls')),
    path('api/students/', include('students.urls')),
]

