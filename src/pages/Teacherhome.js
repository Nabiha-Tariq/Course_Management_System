import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import './Home.css'

const Teacherhome=()=>{
  const navigate =useNavigate()
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function getteacherfromlocal(){
        const storedteacher =  await JSON.parse(localStorage.getItem("teacher"));
        if (storedteacher) {
          setTeacher(storedteacher);
        }
        setLoading(false);
      }
      getteacherfromlocal()
   
    }, []);

    useEffect(() => {
          if (!loading && !teacher) {
            navigate("/login");
          }
        }, [loading, teacher, navigate]);
    
      function handleLogout(){
        localStorage.removeItem("teacher");
        navigate('/login',{replace:true});
      }
    
      function handlemarkBtn(){
        navigate('/teachermarks')

      }

      function handeAttendeceBtn() {
        navigate('/teacherattendence');
      }
    

      if (loading || !teacher) {
        return null; 
      }

   return(
    <div className="profile-container">
    <nav className="navbar">
      <h2>Teacher Profile</h2>
      <div className="button-group">
           <button className="logout-btn" onClick={handleLogout}>
             Logout
           </button>
           <button className="attendence-btn" onClick={handeAttendeceBtn} >
             Attendence
           </button>
           <button className="attendence-btn" onClick={handlemarkBtn}>
             Marks
           </button>
      </div>
    </nav>

    <div className="card-container">
      <div className="card personal-card">
        <h3>Personal Information</h3>
        <p><strong>FirstName:</strong> {teacher.firstName}</p>
        <p><strong>LirstName:</strong> {teacher.lastName}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Status:</strong> {teacher.status}</p>
      </div>
    </div>
  </div>

   );
}
export default Teacherhome;