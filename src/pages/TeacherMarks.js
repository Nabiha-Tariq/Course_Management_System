import React, { useEffect, useState } from "react";
import { courseRegApi } from "../service/courseRegApi";
import { courseApi } from "../service/courseApi";
import { studentApi } from "../service/studentApi";
import './Marks.css'; // create a similar CSS

const TeacherMarks = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [marksData, setMarksData] = useState({});
  const [totalMarks, setTotalMarks] = useState(100); // You can customize this

  useEffect(() => {
    async function fetchTeacherAndCourses() {
      const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
      if (storedTeacher) {
        setTeacher(storedTeacher);

        const selectedCourse = await courseApi();
        const filterCourses = selectedCourse.filter(reg => reg.teacherId === storedTeacher._id);
        setCourses(filterCourses);

        const registrations = await courseRegApi();
        const courseIds = filterCourses.map(c => c.courseId);
        const filterCStudent = registrations.filter(r => courseIds.includes(r.courseId));

        const studentsData = await studentApi();
        const studentsId = filterCStudent.map(item => item.studentId);
        const matchedStudents = studentsData.filter(std => studentsId.includes(std._id));

        setStudents(matchedStudents);
      }
    }
    fetchTeacherAndCourses();
  }, []);

  function handleCourseClick(courseId) {
    setSelectedCourseId(courseId);
    setMarksData({}); // Reset previous marks when course changes
  }

  function handleMarksChange(studentId, value) {
    setMarksData(prev => ({
      ...prev,
      [studentId]: value
    }));
  }

  async function handleSubmitMarks() {
    const marksArray = students.map(student => ({
      studentId: student._id,
      courseId: selectedCourseId,
      teacherId: teacher._id,
      studentName: `${student.firstName} ${student.lastName}`,
      marks: marksData[student._id] || 0,
      totalMarks: totalMarks,
      date: new Date().toISOString().split('T')[0] // today's date
    }));

    try {
      const res = await fetch('http://localhost:5000/api/marks/createMarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marksArray), // send all marks
      });

      if (res.ok) {
        alert('Marks uploaded successfully!');
        
      } else {
        const errorData = await res.json();
        alert('Error uploading marks: ' + errorData.error);
      }
    } catch (err) {
      console.error('Error uploading marks:', err);
      alert('An error occurred while uploading marks.');
    }
  }

  const filteredStudents = students.filter(student => 
    selectedCourseId && student.courseIds?.includes(selectedCourseId)
  );

  return (
    <div>
      <nav className="navbar">
        <h2>Upload Marks</h2>
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

      <div className="marks-upload-container">
        {selectedCourseId && (
          <>
            <h3>Enter Marks for Course: {selectedCourseId}</h3>
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stud, idx) => (
                  <tr key={idx}>
                    <td>{stud.firstName} {stud.lastName}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={totalMarks}
                        value={marksData[stud._id] || ''}
                        onChange={(e) => handleMarksChange(stud._id, e.target.value)}
                        placeholder="Enter marks"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="submit-btn" onClick={handleSubmitMarks}>
              Submit Marks
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherMarks;
