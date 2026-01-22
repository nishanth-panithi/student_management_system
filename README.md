# Student Management System

A full-stack Student Management System built with Django REST Framework and React.

## 🚀 Features

- **Authentication**: JWT-based admin login/logout
- **Student CRUD**: Create, Read, Update, Delete students
- **Search**: Search students by name or roll number
- **Validation**: Frontend and backend validation
- **Clean UI**: Modern, responsive design

## 📁 Project Structure

```
.
├── backend/              # Django backend
│   ├── student_management/
│   ├── students/
│   ├── manage.py
│   └── requirements.txt
└── frontend/             # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    ├── public/
    └── package.json
```

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure MySQL:
   - Create database: `CREATE DATABASE student_management_db;`
   - Update credentials in `student_management/settings.py`

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
```

7. Start server:
```bash
python manage.py runserver
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout

### Students
- `GET /api/students/` - List all students
- `POST /api/students/` - Create student
- `GET /api/students/{id}/` - Get student details
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student
- `GET /api/students/search/?query=term` - Search students

## 🎯 Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Login with the superuser credentials you created
4. Manage students: add, view, edit, delete, and search

## 📝 Notes

- All student endpoints require JWT authentication
- Tokens are stored in browser localStorage
- Make sure MySQL is running before starting the backend
- CORS is configured to allow requests from `localhost:3000`

## 🔧 Technologies Used

**Backend:**
- Django 4.2.7
- Django REST Framework
- JWT Authentication
- MySQL

**Frontend:**
- React 18
- React Router
- Custom CSS (no frameworks)

