"""
URL routing for students app - CRUD endpoints.
"""
from django.urls import path
from . import views

urlpatterns = [
    # Student CRUD endpoints
    path('', views.StudentListCreateView.as_view(), name='student-list-create'),
    path('<int:id>/', views.StudentDetailView.as_view(), name='student-detail'),

    # Search endpoint
    path('search/', views.search_students, name='search-students'),
]

