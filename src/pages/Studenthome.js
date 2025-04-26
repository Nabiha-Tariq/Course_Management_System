import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseApi } from '../service/courseApi';
import { courseRegApi } from '../service/courseRegApi';
import './Home.css';

const Studenthome = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentAndCourses() {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      if (storedStudent) {
        setStudent(storedStudent);

        const registrations = await courseRegApi();
        const studentRegistrations = registrations.filter(reg => reg.studentId === storedStudent._id);
        setSelectedCourses(studentRegistrations);
      }
      setLoading(false);
    }
    fetchStudentAndCourses();
  }, []);

  console.log("selecetedcourse",selectedCourses)

  useEffect(() => {
    async function fetchCourses() {
      const courseList = await courseApi();
      setCourses(Array.isArray(courseList) ? courseList : [courseList]);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!loading && !student) {
      navigate("/login");
    }
  }, [loading, student, navigate]);

  function handleLogout() {
    localStorage.removeItem("student");
    localStorage.removeItem("selectedCourses");
    navigate("/login", { replace: true });
  }

  function handleRegister() {
    navigate('/register');
  }

  function handeAttendeceBtn() {
    navigate('/attendence');
  }

  function handeMarkseBtn() {
    navigate('/marks');
  }

  if (loading || !student) {
    return null; // you can show a spinner instead if you want
  }

  return (
    <div className="profile-container">
      <nav className="navbar">
        <h2>Student Profile</h2>
        <div className="button-group">
           <button className="logout-btn" onClick={handleLogout}>
             Logout
           </button>
           <button className="register-btn" onClick={handleRegister}>
             Register
           </button>
           <button className="attendence-btn" onClick={handeAttendeceBtn} >
             Attendence
           </button>
           <button className="attendence-btn" onClick={handeMarkseBtn} >
             Marks
           </button>
        </div>
      </nav>

      <div className="card-container">
        <div className="card personal-card">
          <h3>Personal Information</h3>
          <p><strong>First Name:</strong> {student.firstName}</p>
          <p><strong>Last Name:</strong> {student.lastName}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Status:</strong> {student.status}</p>
        </div>

        {/* Registered Courses */}
        {selectedCourses.length > 0 ? (
          <div className="card academic-card">
            <h3>Academic Information</h3>
            {selectedCourses.map((reg, index) => {
              const courseDetails = courses.find(c => c.courseId === reg.courseId);
              return courseDetails ? (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <p><strong>Course ID:</strong> {courseDetails.courseId}</p>
                  <p><strong>Course Name:</strong> {courseDetails.courseName}</p>
                  <p><strong>Credit Hours:</strong> {courseDetails.creditHours}</p>
                  <p><strong>Status:</strong> {courseDetails.status}</p>
                  <hr />
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className="card academic-card">
            <h3>No courses registered yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studenthome;
