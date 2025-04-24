import React from "react";
import { useLocation } from "react-router-dom";
import './Home.css'

const Studenthome=()=>{
    const location =useLocation()
    const student= location.state
   return(
    <div className="profile-container">
    <nav className="navbar">
      <h2>Student Profile</h2>
    </nav>

    <div className="card-container">
      <div className="card personal-card">
        <h3>Personal Information</h3>
        <p><strong>FirstName:</strong> {student.firstName}</p>
        <p><strong>LirstName:</strong> {student.lastName}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Status:</strong> {student.status}</p>
      </div>
    </div>
  </div>

   );
}
export default Studenthome;