import React from "react";
import './loginsignup.css';
import { useNavigate } from "react-router-dom";

const Loginsignup = () => {
   const navigate = useNavigate()

   function getLoggedInUserKey() {
    const roles = ["student", "teacher", "admin"];
    for (let role of roles) {
      if (localStorage.getItem(role)) {
        return role;
      }
    }
    return null;
  }

  function handlebtn() {
    const role = getLoggedInUserKey();
    if (role) {
      alert(`Logout the ${role} page`)
      navigate(`/${role}home`);
    } else {
      navigate('/login/studentlogin');
    }
  }

function handleteacherbtn() {
  const role = getLoggedInUserKey();
  if (role) {
    alert(`Logout the ${role} page`)
    navigate(`/${role}home`);
  } else {
    navigate('/login/teacherlogin');
  }
}

function handleAdminbtn() {
  const role = getLoggedInUserKey();
  if (role) {
    alert(`Logout the ${role} page`)
    navigate(`/${role}home`);
  } else {
    navigate('/login/adminlogin');
  }
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

          <button className= "signup-btn" onClick={handleAdminbtn}>
           Admin Login
          </button>


        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
