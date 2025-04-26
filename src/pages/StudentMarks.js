import React, { useEffect, useState } from "react";
import { courseRegApi } from "../service/courseRegApi";
import { marksApi } from "../service/marksApi";
import './Attendence.css'; // (You can rename to Marks.css if you want)

const StudentMarks = () => {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    async function fetchStudentAndCourses() {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      if (storedStudent) {
        setStudent(storedStudent);

        const registrations = await courseRegApi();
        const studentRegistrations = registrations.filter(
          reg => reg.studentId === storedStudent._id
        );
        setCourses(studentRegistrations);

        const marks = await marksApi();
        console.log(marks)
        let fullName = storedStudent.firstName + " " + storedStudent.lastName;

        const stdMarks = marks.filter(record => record.studentName === fullName);
        setStudentMarks(stdMarks);
      }
    }
    fetchStudentAndCourses();
  }, []);

  function handleCourseClick(courseId) {
    setSelectedCourseId(courseId);
  }

  const filteredMarks = studentMarks.filter(record => record.courseId === selectedCourseId);

  return (
    <div>
      <nav className="navbar">
        <h2>Student Marks</h2>
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
            <h3>Marks for Course: {selectedCourseId}</h3>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Obtained Marks</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarks.length > 0 ? (
                  filteredMarks.map((record, idx) => (
                    <tr key={idx}>
                      <td>{record.marks}</td>
                      <td>{record.totalMarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No marks data available.</td>
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

export default StudentMarks;
