import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStudentbyId } from '../service/studentApi';
import './global.css';

const DeleteStudent = () => {
  const navigate = useNavigate();
  const { studentid } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function getStudentDetails() {
      const data = await fetchStudentbyId(studentid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setStudent(dataObj);
    }

    if (studentid) {
      getStudentDetails();
    }
  }, [studentid]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/student/deleteStudent/${studentid}`, {
        method: 'DELETE'
      });

      const result = await res.json();
      alert(result.message || "Student deleted successfully!");
      navigate('/student');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert("Failed to delete student.");
    }
  };

  const handleBack = () => {
    navigate('/student');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Delete Student</h2>

        {student ? (
          <>
            <p><strong>First Name:</strong> {student.firstName}</p>
            <p><strong>Last Name:</strong> {student.lastName}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Status:</strong> {student.status}</p>

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

export default DeleteStudent;
