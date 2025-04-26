import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {teacherApi} from '../service/TeacherApi'
import './global.css';

const AddCourse = () => {
  const navigate = useNavigate();
  
  const [newCourse, setCourse] = useState({
    courseId: '',
    courseName: '',
    creditHours: '',
    status: '',
    teacherId: '',  // ✅ NEW field for teacher
  });

  const [teachers, setTeachers] = useState([]); 
  console.log("teacherId",teachers)
  // ✅ Fetch all teachers on mount
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await teacherApi();
        const dataArray = Array.isArray(data) ? data : [data];
        setTeachers(dataArray);  
      } catch (err) {
        console.error('Error fetching teachers:', err);
      }
    }
    fetchTeachers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/course/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      const data = await res.json();
      console.log('Course saved:', data);

      alert('Course added successfully!');
      navigate('/course');

      setCourse({
        courseId: '',
        courseName: '',
        creditHours: '',
        status: '',
        teacherId: ''
      });
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  return (
    <div className='form'>
      <div className='add-box'>
        <h2 className='heading'>Add a New Course</h2>
        <form onSubmit={handleSubmit}>
          
          <label>Course ID:</label>
          <input 
            type="text" 
            name="courseId"
            placeholder="Course ID" 
            value={newCourse.courseId}
            onChange={handleChange}
            required 
          />
          {newCourse.courseId.length === 0 && <span className="errorMsg">Please enter Course ID</span>}

          <label>Course Name:</label>
          <input 
            type="text" 
            name="courseName"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={handleChange}
            required 
          />
          {newCourse.courseName.length === 0 && <span className="errorMsg">Please enter Course Name</span>}

          {/* ✅ Teacher selection dropdown */}
          <label>Assign Teacher:</label>
          <select 
            name="teacherId" 
            value={newCourse._id}
            onChange={handleChange}
            required
          >
            <option value="">Select a Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
          {newCourse.teacherId.length === 0 && <span className="errorMsg">Please select a Teacher</span>}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
