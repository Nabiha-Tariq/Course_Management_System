import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCoursebyId } from '../service/courseApi';
import './global.css';

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [updatecourse, setupdateCourse] = useState({
    courseId: '',
    courseName: '',
    creditHours: '',
    status: ''
  });

  useEffect(() => {
    async function fetchCourseId() {
      const data = await fetchCoursebyId(courseid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setCourse(dataObj);
      setupdateCourse({
        courseId: dataObj.courseId,
        courseName: dataObj.courseName,
        creditHours: dataObj.creditHours,
        status: dataObj.status
      });
    }

    if (courseid) {
        fetchCourseId();
    }
  }, [courseid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setupdateCourse({ ...updatecourse, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/course/createCourse/${courseid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatecourse)
      });

      const result = await res.json();
      console.log('Updated:', result);
      alert('Course updated successfully!');
      navigate('/course');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleBack = () => {
    navigate('/course');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Edit Course</h2>
        {updatecourse && (
          <>
            <label>Course Id:</label>
            <input
              type="text"
              name="courseid"
              value={updatecourse.courseId}
              onChange={handleChange}
            />

            <label>Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={updatecourse.courseName}
              onChange={handleChange}
            />

            <label>CreditHours:</label>
            <input
              type="number"
              name="creditHours"
              value={updatecourse.creditHours}
              onChange={handleChange}
            />

            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updatecourse.status}
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

export default EditCourse;
