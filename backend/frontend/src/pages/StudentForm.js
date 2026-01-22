import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { studentAPI } from '../services/api';
import { getUserInfo, isAuthenticated } from '../services/auth';
import './StudentForm.css';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id && id !== 'new';

  const [formData, setFormData] = useState({
    full_name: '',
    roll_number: '',
    email: '',
    phone_number: '',
    course: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    setUser(getUserInfo());
  }, [navigate]);

  // Load student data if editing
  useEffect(() => {
    if (isEdit && isAuthenticated()) {
      fetchStudent();
    }
  }, [id, isEdit]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getById(id);
      setFormData({
        full_name: data.full_name || '',
        roll_number: data.roll_number || '',
        email: data.email || '',
        phone_number: data.phone_number || '',
        course: data.course || '',
      });
    } catch (err) {
      setMessage(err.message || 'Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    setMessage('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.roll_number.trim()) {
      newErrors.roll_number = 'Roll number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (formData.phone_number.length < 10) {
      newErrors.phone_number = 'Phone number must be at least 10 digits';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (isEdit) {
        await studentAPI.update(id, formData);
        setMessage('Student updated successfully!');
      } else {
        await studentAPI.create(formData);
        setMessage('Student added successfully!');
      }

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      // Handle validation errors from backend
      if (err.message) {
        const errorObj = {};
        const errorMessage = err.message;

        // Try to parse error message
        if (errorMessage.includes('roll number')) {
          errorObj.roll_number = errorMessage;
        } else if (errorMessage.includes('email')) {
          errorObj.email = errorMessage;
        } else if (errorMessage.includes('phone')) {
          errorObj.phone_number = errorMessage;
        } else {
          setMessage(errorMessage);
        }

        if (Object.keys(errorObj).length > 0) {
          setErrors(errorObj);
        }
      } else {
        setMessage(err.message || 'Failed to save student');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  if (isEdit && loading && !formData.full_name) {
    return <div className="loading">Loading student data...</div>;
  }

  return (
    <div>
      <Navbar username={user.username} />
      <div className="container">
        <div className="form-header">
          <h1>{isEdit ? 'Edit Student' : 'Add New Student'}</h1>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name">Full Name *</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.full_name && <div className="error">{errors.full_name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="roll_number">Roll Number *</label>
              <input
                type="text"
                id="roll_number"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                placeholder="Enter roll number"
              />
              {errors.roll_number && <div className="error">{errors.roll_number}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number *</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone_number && <div className="error">{errors.phone_number}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="course">Course *</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course name"
              />
              {errors.course && <div className="error">{errors.course}</div>}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEdit ? 'Update Student' : 'Add Student'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;

