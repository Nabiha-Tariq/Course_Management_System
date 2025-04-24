import React from "react";
import { useLocation } from "react-router-dom";
import './Home.css'

const Teacherhome=()=>{
    const location =useLocation()
    const teacher= location.state
   return(
    <div className="profile-container">
    <nav className="navbar">
      <h2>Teacher Profile</h2>
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