import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../service/studentApi';
import './Globalpage.css';

const Student = () => {
  const navigate= useNavigate();
  const [studentData ,setstudentData]=useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await studentApi();
      const dataArray = Array.isArray(data) ? data : [data];
      console.log(dataArray)
      setstudentData(data);
      setFilteredData(dataArray);
    }
    fetchData();
  }, []);


  function handlebtn(){
    navigate('/student/add-student')
  }
  
  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = studentData.filter(student =>
      student.firstName.toLowerCase().includes(value) ||
      student.lastName.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  }
  
  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Student Data</h1>
        <input
          type="text"
          className="search_input"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />

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
            {Array.isArray(filteredData) && filteredData.map((student, index)=>{
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