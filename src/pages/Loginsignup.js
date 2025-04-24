import React from "react";
import './loginsignup.css';
import { useNavigate } from "react-router-dom";

const Loginsignup = () => {
   const navigate = useNavigate()

   function handlebtn(){
    navigate('/login/studentlogin')
  }

  function handleteacherbtn(){
    navigate('/login/teacherlogin')
  }
  return (
    <div className="container">
      <div className="signin-box">
        <div className="submit-container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
          <button className= "signup-btn" onClick={handlebtn} >
           Student Login
          </button>

          <button className= "signup-btn" onClick={handleteacherbtn}>
           Teacher Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
