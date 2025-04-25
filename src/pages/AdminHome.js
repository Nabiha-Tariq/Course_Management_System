import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import './Home.css'

const AdminHome=()=>{
    const navigate =useNavigate()
    const [admin, setAdmin] = useState();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getadminfromlocal(){
      const storedAdmin =  await JSON.parse(localStorage.getItem("admin"));
      if (storedAdmin) {
        setAdmin(storedAdmin);
      }
      setLoading(false);
    }
    getadminfromlocal()
 
  }, []);

  useEffect(() => {
      if (!loading && !admin) {
        navigate("/login");
      }
    }, [loading, admin, navigate]);

  function handlelogbtn(){
    localStorage.removeItem("admin");
    navigate('/login',{replace:true});
  }
  if (loading || !admin) {
    return null; 
  }
  
  function handlestudPage(){
    if (localStorage.getItem('admin')) {   // Check if admin data exists
      navigate('/student');
    } else {
      alert("You can't access this page");
      navigate('/login');
    }
  }

  function handleteaherPage(){
    if(localStorage.getItem('admin')){
      navigate('/teacher')
    }
    else{
      alert("You can't access this page")
      navigate('/login')
    }
  }

  function handlecoursPage(){
    if(localStorage.getItem('admin')){
      navigate('/course')
    }
    else{
      alert("You can't access this page")
      navigate('/login')
    }
  }
  
   return(
    <div className="profile-container">
    <nav className="navbar">
      <h2>Admin Profile</h2>
      <button className= "signup-btn" onClick={handlelogbtn}>
            logout
      </button>
    </nav>

    <div className="card-container">
      <div className="card personal-card">
        <h3>Personal Information</h3>
        <p><strong>FirstName:</strong> {admin.firstName}</p>
        <p><strong>LirstName:</strong> {admin.lastName}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Status:</strong> {admin.status}</p>
      </div>

      <div className="card button-card">
        <h3>Handle Information</h3>
        <button className= "signup-btn" onClick={handlestudPage}>
            Student Information
        </button>
        <button className= "signup-btn" onClick={handleteaherPage}>
            Teacher Information
        </button>
        <button className= "signup-btn" onClick={handlecoursPage}>
            Course Information
        </button>
      </div>

    </div>
  </div>

   );
}
export default AdminHome;