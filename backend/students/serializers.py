"""
Serializers for Student model and authentication.
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    """
    Serializer for Student model - handles all CRUD operations.
    """
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'roll_number', 'email', 'phone_number', 'course', 'created_date']
        read_only_fields = ['id', 'created_date']

    def validate_roll_number(self, value):
        """
        Validate that roll number is unique (except for current instance during update).
        """
        # Get the instance if it exists (for updates)
        instance = self.instance
        
        # Check if roll number already exists
        if Student.objects.filter(roll_number=value).exclude(pk=instance.pk if instance else None).exists():
            raise serializers.ValidationError("A student with this roll number already exists.")
        return value

    def validate_email(self, value):
        """
        Validate email format and uniqueness.
        """
        instance = self.instance
        if Student.objects.filter(email=value).exclude(pk=instance.pk if instance else None).exists():
            raise serializers.ValidationError("A student with this email already exists.")
        return value

    def validate_phone_number(self, value):
        """
        Validate phone number length.
        """
        if len(value) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits.")
        return value


class LoginSerializer(serializers.Serializer):
    """
    Serializer for login authentication.
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """
        Validate username and password.
        """
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid username or password.')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return attrs

