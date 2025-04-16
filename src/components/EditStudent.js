import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStudentbyId } from '../service/studentApi';
import './global.css';

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentid } = useParams();
  const [student, setStudent] = useState(null);
  const [updatestudent, setupdateStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: ''
  });

  useEffect(() => {
    async function fetchStudentId() {
      const data = await fetchStudentbyId(studentid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setStudent(dataObj);
      setupdateStudent({
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        email: dataObj.email,
        status: dataObj.status
      });
    }

    if (studentid) {
      fetchStudentId();
    }
  }, [studentid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setupdateStudent({ ...updatestudent, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/student/createStudent/${studentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatestudent)
      });

      const result = await res.json();
      console.log('Updated:', result);
      alert('Student updated successfully!');
      navigate('/student');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleBack = () => {
    navigate('/student');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Edit Student</h2>
        {student && (
          <>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updatestudent.firstName}
              onChange={handleChange}
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={updatestudent.lastName}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatestudent.email}
              onChange={handleChange}
            />

            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updatestudent.status}
              onChange={handleChange}
            />

            <button className="action-btn update-btn" onClick={handleSubmit}>Update</button>
            <button className="action-btn back-btn" onClick={handleBack}>Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
