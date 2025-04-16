import React, { useEffect, useState } from 'react';
import './Globalpage.css';
import { teacherApi } from '../service/TeacherApi';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const [teacherData ,setteacherData]=useState();
  const navigate =useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await teacherApi(); // Call the correct fetch function
        setteacherData(data)
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    }
    fetchData();
  }, []);
  
  function handlebtn(){
    navigate('/teacher/add-teacher')
  }
  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Teacher Data</h1>
        <button class="add-btn"  onClick={handlebtn}>Add New Teacher</button>

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
            {Array.isArray(teacherData) && teacherData.map((teacher, index)=>{
               return(
                 <tr>
                 <td>{index+1}</td>
                 <td>{teacher.firstName}</td>
                 <td>{teacher.lastName}</td>
                 <td>{teacher.email}</td>
                 <td>{teacher.status}</td>
                 <td>
                   <button class="action-btn view-btn" onClick={() => navigate(`/teacher/view-teacher/${teacher._id}`)}>View</button>
                   <button class="action-btn edit-btn" onClick={() => navigate(`/teacher/edit-teacher/${teacher._id}`)}>Edit</button>
                   <button class="action-btn delete-btn" onClick={() => navigate(`/teacher/delete-teacher/${teacher._id}`)}>Delete</button>
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

export default Teacher;