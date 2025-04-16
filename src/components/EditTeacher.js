import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTeacherbyId } from '../service/TeacherApi';
import './global.css';

const EditTeacher = () => {
  const navigate = useNavigate();
  const { teacherid } = useParams();
  const [teacher, setteacher] = useState(null);
  const [updateteacher, setupdateteacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: ''
  });

  useEffect(() => {
    async function fetchTeacherId() {
      const data = await fetchTeacherbyId(teacherid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setteacher(dataObj);
      setupdateteacher({
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        email: dataObj.email,
        status: dataObj.status
      });
    }

    if (teacherid) {
        fetchTeacherId();
    }
  }, [teacherid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setupdateteacher({ ...updateteacher, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/teacher/createTeacher/${teacherid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateteacher)
      });

      const result = await res.json();
      console.log('Updated:', result);
      alert('Teacher updated successfully!');
      navigate('/teacher');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleBack = () => {
    navigate('/teacher');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Edit Teacher</h2>
        {teacher && (
          <>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updateteacher.firstName}
              onChange={handleChange}
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={updateteacher.lastName}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updateteacher.email}
              onChange={handleChange}
            />

            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updateteacher.status}
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

export default EditTeacher;
