import React, { useEffect, useState } from "react";
import user_icon from '../assets/User-icon.png';
import email_icon from '../assets/Email-icon.png';
import password_icon from '../assets/Password-icon.png';
import '../pages/loginsignup.css';
import { useNavigate } from "react-router-dom";
import { studentApi } from '../service/studentApi';
 


const Studentlogin = () => {
  const navigate =useNavigate()
  const [loginStudent , setLoginStudent]= useState({
    name: '',
    email: '',
    password:'',
})
  const [student, setStudent] = useState()
  useEffect(()=>{
    async function getstudent(){
        const data = await studentApi();
        const dataArray = Array.isArray(data) ? data : [data];
        setStudent(dataArray);  
    }    
    getstudent()
  },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginStudent({...loginStudent,[name]:value})
  };
   

  function handlebtn(){
    navigate('/login')
  }
  
  function handleLoginbtn() {
    if (student && loginStudent) {
      const matchedStudent = student.find((std) => 
        std.email === loginStudent.email && std.password === loginStudent.password
      );
  
      if (matchedStudent) {
        if (matchedStudent.status !== "active") {
          alert("Student is not active");
          return;
        }
        navigate('/student');
      } else {
        alert("Invalid email or password");
      }
    }
  }

  return (
    <div className="container">
      <div className="signin-box">
        <div className="header">
          <div className="text">Student Login</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User icon" />
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={loginStudent.name}
              onChange={handleChange}
              required/>
          </div>
          <div className="input">
            <img src={email_icon} alt="Email icon" />
            <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={loginStudent.email}
                onChange={handleChange} 
                required/>
          </div>
          <div className="input">
            <img src={password_icon} alt="Password icon" />
            <input 
              type="password" 
              placeholder="Password" 
              name = "password"
              value={loginStudent.password}
              onChange={handleChange}
              required/>
          </div>
        </div>

        <div className="submit-container">
          <button className= "signup-btn" onClick={handleLoginbtn}>
            Login
          </button>
          <button className= "signup-btn" onClick={handlebtn}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Studentlogin;
