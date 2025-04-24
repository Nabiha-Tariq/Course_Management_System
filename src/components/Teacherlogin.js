import React, { useEffect, useState } from "react";
import user_icon from '../assets/User-icon.png';
import email_icon from '../assets/Email-icon.png';
import password_icon from '../assets/Password-icon.png';
import '../pages/loginsignup.css';
import { useNavigate } from "react-router-dom";
import {teacherApi} from '../service/TeacherApi'
 


const Teacherlogin = () => {
  const navigate =useNavigate()
  const [loginTeacher , setLoginTeacher]= useState({
    name: '',
    email: '',
    password:'',
})
  const [teacher, setTeacher] = useState()
  useEffect(()=>{
    async function getteacher(){
        const data = await teacherApi();
        const dataArray = Array.isArray(data) ? data : [data];
        setTeacher(dataArray);  
    }    
    getteacher()
  },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginTeacher({...loginTeacher,[name]:value})
  };
   

  function handlebtn(){
    navigate('/login')
  }
  
  function handleLoginbtn() {
    if (teacher && loginTeacher) {
      const matchedTeacher = teacher.find((techr) => 
        techr.email === loginTeacher.email && techr.password === loginTeacher.password
      );
  
      if (matchedTeacher) {
        if (matchedTeacher.status !== "active") {
          alert("Teacher is not active");
          return;
        }
        navigate('/teacher');
      } else {
        alert("Invalid email or password");
      }
    }
  }

  return (
    <div className="container">
      <div className="signin-box">
        <div className="header">
          <div className="text">Teacher Login</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User icon" />
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={loginTeacher.name}
              onChange={handleChange}
              required/>
          </div>
          <div className="input">
            <img src={email_icon} alt="Email icon" />
            <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={loginTeacher.email}
                onChange={handleChange} 
                required/>
          </div>
          <div className="input">
            <img src={password_icon} alt="Password icon" />
            <input 
              type="password" 
              placeholder="Password" 
              name = "password"
              value={loginTeacher.password}
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

export default Teacherlogin;
