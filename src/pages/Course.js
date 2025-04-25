import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseApi } from '../service/courseApi';
import './Globalpage.css';

const Course = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkingAccess, setCheckingAccess] = useState(true);

   useEffect(() => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        alert("You can't access this page")
        navigate('/login');
      }else {
        setCheckingAccess(false);
      }
    }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await courseApi();
      const dataArray = Array.isArray(data) ? data : [data];
      console.log("Fetched course data:", dataArray);
      setCourseData(dataArray);
      setFilteredData(dataArray);
    }
    fetchData();
  }, []);

  

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = courseData.filter(course =>
      course.courseId.toLowerCase().includes(value) ||
      course.courseName.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  }

 function handlebtn() {
    navigate('/course/add-course');
  }

  if (checkingAccess) {
    return null; // or a loader
  }

  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Course Data</h1>
        <input
          type="text"
          className="search_input"
          placeholder="Search by Course ID or Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button className="add-btn" onClick={handlebtn}>
          Add New Course
        </button>

        <table>
          <thead>
            <tr>
              <th>CourseID</th>
              <th>CourseName</th>
              <th>CreditHours</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.map((course) => (
                <tr key={course._id}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.creditHours}</td>
                  <td>{course.status}</td>
                  <td>
                    <button className="action-btn view-btn" onClick={() => navigate(`/course/view-course/${course.courseId}`)}>View</button>
                    <button className="action-btn edit-btn" onClick={() => navigate(`/course/edit-course/${course.courseId}`)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => navigate(`/course/delete-course/${course.courseId}`)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
