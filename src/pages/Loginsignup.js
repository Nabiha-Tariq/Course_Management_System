import React, { useEffect } from "react";
import "./loginsignup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setUserFromStorage} from '../redux/AuthSlice'

const Loginsignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Load from localStorage and set Redux state
  useEffect(() => {
    const roles = ["student", "teacher", "admin"];
    for (let r of roles) {
      const user = localStorage.getItem(r);
      if (user) {
        dispatch(setUserFromStorage({ user: JSON.parse(user), role: r }));
        break;
      }
    }
  }, [dispatch]);

  function handleRedirect(path) {
    if (isAuthenticated) {
      alert(`Logout the ${role} page`);
      navigate(`/${role}home`);
    } else {
      navigate(path);
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

          <button className="signup-btn" onClick={() => handleRedirect('/login/studentlogin')}>
            Student Login
          </button>

          <button className="signup-btn" onClick={() => handleRedirect('/login/teacherlogin')}>
            Teacher Login
          </button>

          <button className="signup-btn" onClick={() => handleRedirect('/login/adminlogin')}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
