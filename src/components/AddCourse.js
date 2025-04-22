import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';

const AddCourse = () => {
  const navigate= useNavigate()
  const [newCourse, setCourse] = useState({
    courseId: '',
    courseName: '',
    creditHours: '',
    status: ''
  });

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

        // ✅ Redirect to student page
      navigate('/course');

      // Clear form
      setCourse({
        courseId: '',
        courseName: '',
      });
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  return (
    <div className='form'>
      <div className='add-box'>
        <h2 className='heading'>Add a new Course</h2>
        <form onSubmit={handleSubmit}>
          <label>CourseId:</label>
          <input 
            type="text" 
            name="courseId"
            placeholder="ID" 
            value={newCourse.courseId}
            onChange={handleChange}
            required 
          />
          {newCourse.courseId.length ===0 && <span className="errorMsg">
            Please enter Course Id</span>}  

          <label>CourseName:</label>
          <input 
            type="text" 
            name="courseName"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={handleChange}
            required 
          />
          {newCourse.courseName.length === 0 && <span className="errorMsg">
            Please enter Course name</span>} 


          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
