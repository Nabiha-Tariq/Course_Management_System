import React, { useEffect, useState } from "react";
import user_icon from '../assets/User-icon.png';
import email_icon from '../assets/Email-icon.png';
import password_icon from '../assets/Password-icon.png';
import '../pages/loginsignup.css';
import { useNavigate } from "react-router-dom";
import { adminApi } from '../service/adminApi';
 
const Adminlogin = () => {
  const navigate =useNavigate()
  const [loginAdmin , setLoginAdmin]= useState({
    name: '',
    email: '',
    password:'',
})
  const [admin, setAdmin] = useState()
  useEffect(()=>{
    async function getadmin(){
        const data = await adminApi();
        const dataArray = Array.isArray(data) ? data : [data];
        setAdmin(dataArray);  
    }    
    getadmin()
  },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginAdmin({...loginAdmin,[name]:value})
  };
   

  function handlebtn(){
    navigate('/login')
  }
  
  function handleLoginbtn() {
    if (admin && loginAdmin) {
      const matchedAdmin = admin.find((admn) => 
        admn.email === loginAdmin.email && admn.password === loginAdmin.password
      );
  
      if (matchedAdmin) {
        if (matchedAdmin.status !== "active") {
          alert("Admin is not active");
          return;
        }
        localStorage.setItem("admin", JSON.stringify(matchedAdmin))
        navigate('/adminhome');
      } else {
        alert("Invalid email or password");
      }
    }
  }

  return (
    <div className="container">
      <div className="signin-box">
        <div className="header">
          <div className="text">Admin Login</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User icon" />
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={loginAdmin.name}
              onChange={handleChange}
              required/>
          </div>
          <div className="input">
            <img src={email_icon} alt="Email icon" />
            <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={loginAdmin.email}
                onChange={handleChange} 
                required/>
          </div>
          <div className="input">
            <img src={password_icon} alt="Password icon" />
            <input 
              type="password" 
              placeholder="Password" 
              name = "password"
              value={loginAdmin.password}
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

export default Adminlogin;
