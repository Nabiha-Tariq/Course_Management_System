import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';

const AddTeacher = () => {
  const navigate= useNavigate()
  const [newTeacher, setTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status:'',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacher({ ...newTeacher, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/teacher/createTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacher),
      });

      const data = await res.json();
      console.log('Teacher saved:', data);

      alert('Teacher added successfully!');

        // ✅ Redirect to student page
      navigate('/teacher');

      // Clear form
      setTeacher({
        firstName: '',
        lastName: '',
        email: '',
      });


    } catch (err) {
      console.error('Error saving teacher:', err);
    }
  };

  return (
    <div className='form'>
      <div className='add-box'>
        <h2 className='heading'>Add a new Teacher</h2>
        <form onSubmit={handleSubmit}>
          <label>FirstName:</label>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            value={newTeacher.firstName}
            onChange={handleChange}
            required 
          />
          {newTeacher.firstName.length ===0 && <span className="errorMsg">
            Please enter Your first name</span>}  

          <label>LastName:</label>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name"
            value={newTeacher.lastName}
            onChange={handleChange}
            required 
          />
          {newTeacher.lastName.length ===0 && <span className="errorMsg">
            Please enter Your last name</span>} 

          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={newTeacher.email}
            onChange={handleChange}
            required 
          />
          {newTeacher.email.length ===0 && <span className="errorMsg">
            Please enter Your email</span>} 


          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
