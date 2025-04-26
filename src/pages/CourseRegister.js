import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseApi } from '../service/courseApi';
import './Globalpage.css';

const CourseRegister = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [studentId, setStudentId] = useState('');


  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student) {
      alert("You can't access this page");
      navigate('/login');
    } else {
      setStudentId(student._id); // get student id from local storage
      setCheckingAccess(false);
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await courseApi();
      const dataArray = Array.isArray(data) ? data : [data];
      setCourse(dataArray);
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedCourses.includes(value)) {
      setSelectedCourses(selectedCourses.filter((course) => course !== value));  // Remove courseId
    } else {
      setSelectedCourses([...selectedCourses, value]);  // Add courseId
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/Course_Register/createRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          selectedCourses: selectedCourses,
        }),
      });
    
      if (res.ok) {
        alert('Courses registered successfully!');
        localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
        navigate('/studenthome');
      } else {
        const errorData = await res.json();
        alert('Error registering courses: ' + errorData.error);
      }
    } catch (err) {
      console.error('Error registering courses:', err);
      alert('An error occurred while registering the courses.');
    }
    
  };

  if (checkingAccess) {
    return null; // or a loading spinner
  }

  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Course Registration</h1>

        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>CourseId</th>
                <th>CourseName</th>
                <th>CreditHours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(course) && course.map((course) => (
                <tr key={course._id}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.creditHours}</td>
                  <td>{course.status}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={course.courseId}
                      onChange={handleCheckboxChange}
                      checked={selectedCourses.includes(course.courseId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="view-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegister;
