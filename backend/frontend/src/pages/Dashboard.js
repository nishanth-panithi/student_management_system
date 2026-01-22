import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { studentAPI } from '../services/api';
import { getUserInfo, isAuthenticated } from '../services/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    setUser(getUserInfo());
  }, [navigate]);

  // Fetch students
  useEffect(() => {
    if (isAuthenticated()) {
      fetchStudents();
    }
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await studentAPI.getAll(searchQuery);
      // Handle response - should be an array
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await studentAPI.delete(id);
      // Refresh the list
      fetchStudents();
    } catch (err) {
      setError(err.message || 'Failed to delete student');
    }
  };

  const handleEdit = (id) => {
    navigate(`/student/${id}`);
  };

  const handleAdd = () => {
    navigate('/student/new');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Navbar username={user.username} />
      <div className="container">
        <div className="dashboard-header">
          <h1>Student Management</h1>
          <button className="btn btn-success" onClick={handleAdd}>
            + Add Student
          </button>
        </div>

        {error && <div className="message message-error">{error}</div>}

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="no-data">
            <p>No students found. {searchQuery && 'Try a different search term.'}</p>
            {!searchQuery && (
              <button className="btn btn-primary" onClick={handleAdd}>
                Add First Student
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Course</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.full_name}</td>
                    <td>{student.roll_number}</td>
                    <td>{student.email}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.course}</td>
                    <td>{new Date(student.created_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(student.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

