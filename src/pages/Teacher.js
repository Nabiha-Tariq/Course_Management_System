import React, { useEffect, useState } from 'react';
import './Globalpage.css';
import { teacherApi } from '../service/TeacherApi';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const [teacherData ,setteacherData]=useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkingAccess, setCheckingAccess] = useState(true);


  const navigate =useNavigate()

  useEffect(() => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        alert("You can't access this page")
        navigate('/login');
      }else {
        setCheckingAccess(false);
      }
    }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await teacherApi(); // Call the correct fetch function
        setteacherData(data)
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    }
    fetchData();
  }, []);
  
  function handlebtn(){
    navigate('/teacher/add-teacher')
  }

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = teacherData.filter(teacher =>
      teacher.firstName.toLowerCase().includes(value) ||
      teacher.lastName.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  }

  if (checkingAccess) {
    return null; // or a loader
  }

  return (
    <div className="form">
      <div className="record-box">
        <h1 className="heading">Teacher Data</h1>
        <input
          type="text"
          className="search_input"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />

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
            {Array.isArray(filteredData) && filteredData.map((teacher, index)=>{
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
        <button className="add-btn" onClick={()=>navigate('/teacherhome')}>
          Back
        </button>
        
      </div>
    </div>
  );
};

export default Teacher;