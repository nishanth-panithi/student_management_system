# Student Management System - Frontend

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

- **Login Page**: Admin authentication
- **Dashboard**: View all students with search functionality
- **Add Student**: Create new student records
- **Edit Student**: Update existing student information
- **Delete Student**: Remove student records
- **Search**: Search students by name or roll number

## API Configuration

The frontend is configured to connect to the Django backend at `http://localhost:8000`. Make sure the backend is running before using the frontend.

## Notes

- All routes except `/login` are protected and require authentication
- JWT tokens are stored in localStorage
- The app automatically redirects to login if not authenticated

