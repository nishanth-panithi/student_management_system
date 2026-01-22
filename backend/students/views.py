"""
API views for authentication and student CRUD operations.
"""
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Student
from .serializers import StudentSerializer, LoginSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login API - Returns JWT tokens on successful authentication.
    """
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login successful',
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
            }
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Logout API - Returns success message.
    Note: Token invalidation is handled on the frontend by removing tokens from localStorage.
    """
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


class StudentListCreateView(generics.ListCreateAPIView):
    """
    API view to list all students and create a new student.
    GET /api/students/ - List all students
    POST /api/students/ - Create a new student
    """
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get queryset with optional search functionality.
        """
        queryset = Student.objects.all()
        search_query = self.request.query_params.get('search', None)

        if search_query:
            # Search by name or roll number
            queryset = queryset.filter(
                Q(full_name__icontains=search_query) |
                Q(roll_number__icontains=search_query)
            )

        return queryset


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific student.
    GET /api/students/{id}/ - Get student details
    PUT /api/students/{id}/ - Update student
    DELETE /api/students/{id}/ - Delete student
    """
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    lookup_field = 'id'


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_students(request):
    """
    Search students by name or roll number.
    GET /api/students/search/?query=search_term
    """
    query = request.query_params.get('query', '')

    if not query:
        return Response(
            {'error': 'Please provide a search query'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Search in name and roll number
    students = Student.objects.filter(
        Q(full_name__icontains=query) |
        Q(roll_number__icontains=query)
    )

    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

