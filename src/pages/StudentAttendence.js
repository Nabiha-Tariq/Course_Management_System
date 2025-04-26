import React, { useEffect, useState } from "react";
import { courseRegApi } from "../service/courseRegApi";
import { attendenceApi } from "../service/attendenceApi";
import './Attendence.css';

const StudentAttendence = () => {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchStudentAndCourses() {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      if (storedStudent) {
        setStudent(storedStudent);

        const registrations = await courseRegApi();
        const studentRegistrations = registrations.filter(reg => reg.studentId === storedStudent._id);
        setCourses(studentRegistrations);

        const attendance = await attendenceApi();
        let fullName = storedStudent.firstName + " " + storedStudent.lastName;

        const studentAttendance = attendance.filter(record => record.studentName === fullName);
        setAttendanceData(studentAttendance);
      }
    }
    fetchStudentAndCourses();
  }, []);

  function handleCourseClick(courseId) {
    setSelectedCourseId(courseId);
  }

  const filteredAttendance = attendanceData.filter(record => record.courseId === selectedCourseId);

  return (
    <div>
      <nav className="navbar">
        <h2>Student Attendance</h2>
        <div className="course-list">
          {courses.map((course, index) => (
            <button
              key={index}
              className="course-btn"
              onClick={() => handleCourseClick(course.courseId)}
            >
              {course.courseId}
            </button>
          ))}
        </div>
      </nav>

      <div className="attendance-table-container">
        {selectedCourseId && (
          <>
            <h3>Attendance for Course: {selectedCourseId}</h3>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, idx) => (
                    <tr key={idx}>
                      <td>{record.date}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No attendance data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentAttendence;
