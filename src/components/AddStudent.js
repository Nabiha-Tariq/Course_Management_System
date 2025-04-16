import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';

const AddStudent = () => {
  const navigate= useNavigate()
  const [newStudent, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/student/createStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      const data = await res.json();
      console.log('Student saved:', data);

      alert('Student added successfully!');

        // ✅ Redirect to student page
      navigate('/student');

      // Clear form
      setStudent({
        firstName: '',
        lastName: '',
        email: '',
      });


    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  return (
    <div className='form'>
      <div className='add-box'>
        <h2 className='heading'>Add a new Student</h2>
        <form onSubmit={handleSubmit}>
          <label>FirstName:</label>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            value={newStudent.firstName}
            onChange={handleChange}
            required 
          />
          {newStudent.firstName.length ===0 && <span className="errorMsg">
            Please enter Your first name</span>}  

          <label>LastName:</label>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={handleChange}
            required 
          />
          {newStudent.lastName.length ===0 && <span className="errorMsg">
            Please enter Your last name</span>} 

          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={newStudent.email}
            onChange={handleChange}
            required 
          />
          {newStudent.email.length ===0 && <span className="errorMsg">
            Please enter Your email</span>} 


          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
