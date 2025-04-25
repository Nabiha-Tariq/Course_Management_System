import React, { useEffect, useState } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";

const Studenthome = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getstudentfromlocal(){
    const storedStudent =await JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setStudent(storedStudent);
    }
    setLoading(false);
    } 
    getstudentfromlocal()
  }, []);

  useEffect(() => {
    if (!loading && !student) {
      navigate("/login");
    }
  }, [loading, student, navigate]);

  function handlelogbtn() {
    localStorage.removeItem("student");
    navigate("/login",{replace:true});
  }

  if (loading || !student) {
    return null; 
  }

  return (
    <div className="profile-container">
      <nav className="navbar">
        <h2>Student Profile</h2>
        <button className="signup-btn" onClick={handlelogbtn}>
          Logout
        </button>
      </nav>
      <div className="card-container">
        <div className="card personal-card">
          <h3>Personal Information</h3>
          <p><strong>FirstName:</strong> {student.firstName}</p>
          <p><strong>LastName:</strong> {student.lastName}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Status:</strong> {student.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Studenthome;
