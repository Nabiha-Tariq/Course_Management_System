import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTeacherbyId } from '../service/TeacherApi';
import './global.css';

const DeleteTeacher = () => {
  const navigate = useNavigate();
  const { teacherid } = useParams();
  const [teacher, setteacher] = useState(null);

  useEffect(() => {
    async function getTeacherDetails() {
      const data = await fetchTeacherbyId(teacherid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setteacher(dataObj);
    }

    if (teacherid) {
        getTeacherDetails();
    }
  }, [teacherid]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/teacher/deleteTeacher/${teacherid}`, {
        method: 'DELETE'
      });

      const result = await res.json();
      alert(result.message || "Teacher deleted successfully!");
      navigate('/teacher');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert("Failed to delete teacher.");
    }
  };

  const handleBack = () => {
    navigate('/teacher');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Delete Teacher</h2>

        {teacher ? (
          <>
            <p><strong>First Name:</strong> {teacher.firstName}</p>
            <p><strong>Last Name:</strong> {teacher.lastName}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Status:</strong> {teacher.status}</p>

            <button className="action-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="action-btn back-btn" onClick={handleBack}>Cancel</button>
          </>
        ) : (
          <p>Loading student data...</p>
        )}
      </div>
    </div>
  );
};

export default DeleteTeacher;
