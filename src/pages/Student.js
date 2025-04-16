import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../service/studentApi';
import './Globalpage.css';

const Student = () => {
  const navigate= useNavigate();
  const [studentData ,setstudentData]=useState();

  useEffect(() => {
    async function fetchData() {
      const data = await studentApi();
      const dataArray = Array.isArray(data) ? data : [data];
      console.log(dataArray)
      setstudentData(data);
    }
    fetchData();
  }, []);

  function handlebtn(){
    navigate('/student/add-student')
  }
  
  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Student Data</h1>
        <button class="add-btn" onClick={handlebtn}>Add New Student</button>

        <table>
          <thead>
            <tr>
              <th>SL NO</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
            {Array.isArray(studentData) && studentData.map((student, index)=>{
               return(
                 <tr>
                 <td>{index+1}</td>
                 <td>{student.firstName}</td>
                 <td>{student.lastName}</td>
                 <td>{student.email}</td>
                 <td>{student.status}</td>
                 <td>
                   <button class="action-btn view-btn" onClick={() => navigate(`/student/view-student/${student._id}`)}>View</button>
                   <button class="action-btn edit-btn" onClick={() => navigate(`/student/edit-student/${student._id}`)}>Edit</button>
                   <button class="action-btn delete-btn" onClick={() => navigate(`/student/delete-student/${student._id}`)}>Delete</button>
                 </td>
                 </tr>
               )

              })  
            }
            </tbody>
        </table>   
      </div>
    </div>
  );
};

export default Student;