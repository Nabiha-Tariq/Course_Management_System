import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCoursebyId } from '../service/courseApi';
import './global.css';

const DeleteStudent = () => {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function getCourseDetails() {
      const data = await fetchCoursebyId(courseid);
      const dataObj = Array.isArray(data) ? data[0] : data;
      setCourse(dataObj);
    }

    if (courseid) {
        getCourseDetails();
    }
  }, [courseid]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/course/deleteCourse/${courseid}`, {
        method: 'DELETE'
      });

      const result = await res.json();
      alert(result.message || "Course deleted successfully!");
      navigate('/course');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert("Failed to delete course.");
    }
  };

  const handleBack = () => {
    navigate('/course');
  };

  return (
    <div className="form">
      <div className="add-box">
        <h2 className="heading">Delete Course</h2>

        {course ? (
          <>
            <p><strong>Course Id:</strong> {course.courseId}</p>
            <p><strong>Course Name:</strong> {course.courseName}</p>
            <p><strong>creditHours:</strong> {course.creditHours}</p>
            <p><strong>Status:</strong> {course.status}</p>

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
