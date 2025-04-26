import React, { useEffect, useState } from "react";
import { courseRegApi } from "../service/courseRegApi";
import { courseApi } from "../service/courseApi";
import { studentApi } from "../service/studentApi";
import './Attendence.css';

const TeacherAttendance = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);   
  const [students, setStudents] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchTeacherAndCourses() {
      const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
      console.log("storedTeacher:", storedTeacher);
    
      if (storedTeacher) {
        setTeacher(storedTeacher);
    
        try {
          const selectedCourse = await courseApi();
          console.log("selectedCourse:", selectedCourse);
    
          if (!Array.isArray(selectedCourse)) {
            console.error('selectedCourse is not an array!', selectedCourse);
            return;
          }
    
          const filterCourses = selectedCourse.filter(reg => reg.teacherId === storedTeacher._id);
          setCourses(filterCourses);
    
          const registrations = await courseRegApi();
          if (!Array.isArray(registrations)) {
            console.error('registrations is not an array!', registrations);
            return;
          }
    
          const courseIds = filterCourses.map(c => c.courseId);
          const filterCStudent = registrations.filter(r => courseIds.includes(r.courseId));
    
          const studentsData = await studentApi();
          if (!Array.isArray(studentsData)) {
            console.error('studentsData is not an array!', studentsData);
            return;
          }
    
          const studentsId = filterCStudent.map(item => item.studentId);
          const matchedStudents = studentsData.filter(std => studentsId.includes(std._id));
    
          setStudents(matchedStudents);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    fetchTeacherAndCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId && students.length > 0) {
      const initialAttendance = students.map(student => ({
        studentId: student._id,
        studentName: `${student.firstName} ${student.lastName}`,
        status: 'Present', // default status
      }));
      setAttendanceRecords(initialAttendance);
    }
  }, [selectedCourseId, students]);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index].status = newStatus;
    setAttendanceRecords(updatedRecords);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!date) {
      alert('Please select a date.');
      return;
    }
  
    try {
      for (const record of attendanceRecords) {
        const attendanceData = {
          teacherId: teacher._id,
          courseId: selectedCourseId,
          studentId: record.studentId,
          studentName: record.studentName,
          date: date,
          status: record.status,
        };
  
        const res = await fetch('http://localhost:5000/api/attendence/createAttendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendanceData),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error marking attendance for:', record.studentName, errorData);
          alert(`Error marking attendance for ${record.studentName}: ${errorData.error}`);
          return; // stop if any student's attendance fails
        }
      }
  
      alert('Attendance marked successfully for all students!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('An error occurred while marking attendance.');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Attendance</h2>
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

            <div className="date-picker-container">
              <label>Select Date:</label>
              <input 
                type="date" 
                value={date} 
                onChange={handleDateChange} 
                className="date-picker"
              />
            </div>

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.studentName}</td>
                    <td>{date || 'Select date'}</td>
                    <td>
                      <select
                        value={record.status}
                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="save-btn-container">
              <button className="course-btn" onClick={handleSubmit}>Save Attendance</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendance;
