# Student Management System - Backend

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note:** If you encounter issues installing `mysqlclient`, you can use `PyMySQL` as an alternative. Add this to your `settings.py`:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

### 2. Configure MySQL Database

1. Create a MySQL database:
```sql
CREATE DATABASE student_management_db;
```

2. Update database credentials in `student_management/settings.py`:
   - `USER`: your MySQL username (default: 'root')
   - `PASSWORD`: your MySQL password (default: 'root')
   - `HOST`: your MySQL host (default: 'localhost')
   - `PORT`: your MySQL port (default: '3306')

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin user. This will be your login credentials.

### 5. Run Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
  - Body: `{"username": "admin", "password": "password"}`
  - Returns: `{"access_token": "...", "refresh_token": "...", "user": {...}}`

- `POST /api/auth/logout/` - Logout
  - Headers: `Authorization: Bearer <access_token>`
  - Returns: `{"message": "Logout successful"}`

### Students
- `GET /api/students/` - List all students
  - Headers: `Authorization: Bearer <access_token>`
  - Query params: `?search=term` (optional)

- `POST /api/students/` - Create student
  - Headers: `Authorization: Bearer <access_token>`
  - Body: `{"full_name": "...", "roll_number": "...", "email": "...", "phone_number": "...", "course": "..."}`

- `GET /api/students/{id}/` - Get student details
  - Headers: `Authorization: Bearer <access_token>`

- `PUT /api/students/{id}/` - Update student
  - Headers: `Authorization: Bearer <access_token>`
  - Body: `{"full_name": "...", ...}`

- `DELETE /api/students/{id}/` - Delete student
  - Headers: `Authorization: Bearer <access_token>`

- `GET /api/students/search/?query=term` - Search students
  - Headers: `Authorization: Bearer <access_token>`

## Notes

- All student endpoints require authentication (JWT token)
- Include token in headers: `Authorization: Bearer <access_token>`
- CORS is configured to allow requests from `http://localhost:3000`
- Admin panel available at `http://localhost:8000/admin/`

## Testing the API

You can test the API using:
- Postman
- curl
- The React frontend (recommended)

Example curl command for login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

