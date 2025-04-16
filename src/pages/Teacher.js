import React, { useEffect, useState } from 'react';
//import AddTeacher from '../components/AddTeacher';
//import EditTeacher from '../components/EditTeacher';
import './Globalpage.css';
import { TeacherApi } from '../service/TeacherApi';

const Teacher = () => {
  const [teacherData ,setteacherData]=useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TeacherApi(); // Call the correct fetch function
        setteacherData(data)
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Teacher Data</h1>
        <button class="add-btn">Add New Teacher</button>

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
                 <td>{index}</td>
                 <td>{teacher.firstName}</td>
                 <td>{teacher.lastName}</td>
                 <td>{teacher.email}</td>
                 <td>{teacher.status}</td>
                 <td>
                   <button class="action-btn view-btn">View</button>
                   <button class="action-btn edit-btn">Edit</button>
                   <button class="action-btn delete-btn">Delete</button>
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