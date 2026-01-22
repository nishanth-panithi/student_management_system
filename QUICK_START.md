# Quick Start Guide

## Prerequisites

- Python 3.8+ installed
- Node.js and npm installed
- MySQL installed and running

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create MySQL database
mysql -u root -p
CREATE DATABASE student_management_db;
EXIT;

# Update database password in backend/student_management/settings.py if needed

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Enter username, email, and password when prompted

# Start server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run at: `http://localhost:3000`

### 3. Access the Application

1. Open browser: `http://localhost:3000`
2. Login with the superuser credentials you created
3. Start managing students!

## Troubleshooting

### MySQL Connection Error
- Make sure MySQL is running
- Check database credentials in `backend/student_management/settings.py`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
- Backend: Change port with `python manage.py runserver 8001`
- Frontend: React will prompt to use a different port

### CORS Errors
- Make sure backend is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in `backend/student_management/settings.py`

### Module Not Found (Python)
- Make sure virtual environment is activated
- Reinstall: `pip install -r requirements.txt`

### Module Not Found (Node)
- Delete `node_modules` and `package-lock.json`
- Reinstall: `npm install`

## Next Steps

- Add sample students through the UI
- Explore the admin panel at `http://localhost:8000/admin/`
- Check API endpoints using Postman or curl

