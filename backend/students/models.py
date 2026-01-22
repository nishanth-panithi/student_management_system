"""
Student model for the Student Management System.
"""
from django.db import models
from django.core.validators import EmailValidator, RegexValidator


class Student(models.Model):
    """
    Student model with all required fields.
    """
    # Full name of the student
    full_name = models.CharField(max_length=200, help_text="Student's full name")

    # Roll number - must be unique
    roll_number = models.CharField(
        max_length=50,
        unique=True,
        help_text="Unique roll number for the student"
    )

    # Email - validated format
    email = models.EmailField(
        max_length=255,
        validators=[EmailValidator()],
        help_text="Valid email address"
    )

    # Phone number - 10 digits
    phone_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )],
        help_text="Contact phone number"
    )

    # Course name
    course = models.CharField(max_length=200, help_text="Course name")

    # Created date - automatically set when student is created
    created_date = models.DateTimeField(auto_now_add=True, help_text="Date when student was added")
    
    class Meta:
        ordering = ['-created_date']  # Newest students first
        verbose_name = 'Student'
        verbose_name_plural = 'Students'
    
    def __str__(self):
        return f"{self.full_name} ({self.roll_number})"

