"""
Admin configuration for Student model.
"""
from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    """
    Admin interface for Student model.
    """
    list_display = ['full_name', 'roll_number', 'email', 'course', 'created_date']
    list_filter = ['course', 'created_date']
    search_fields = ['full_name', 'roll_number', 'email']
    readonly_fields = ['created_date']

