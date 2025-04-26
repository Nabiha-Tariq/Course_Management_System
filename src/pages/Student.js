import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../service/studentApi';
import './Globalpage.css';

const Student = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      alert("You can't access this page");
      navigate('/login');
    } else {
      setCheckingAccess(false);
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await studentApi();
      const dataArray = Array.isArray(data) ? data : [data];
      setStudentData(data);
      setFilteredData(dataArray);
    }
    fetchData();
  }, []);

  function handleBtn() {
    if (!checkingAccess) {
      navigate('/student/add-student');
    }
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

  function handleAction(action, studentId) {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      alert("You must be logged in as an admin to perform this action");
      navigate('/login');
    } else {
      switch (action) {
        case 'view':
          navigate(`/student/view-student/${studentId}`);
          break;
        case 'edit':
          navigate(`/student/edit-student/${studentId}`);
          break;
        case 'delete':
          navigate(`/student/delete-student/${studentId}`);
          break;
        default:
          break;
      }
    }
  }

  // Show loading screen while checking access
  if (checkingAccess) {
    return null; // or a loading spinner
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

        <button className="add-btn" onClick={handleBtn}>Add New Student</button>

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
            {Array.isArray(filteredData) && filteredData.map((student, index) => {
              return (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.status}</td>
                  <td>
                    <button className="action-btn view-btn" onClick={() => handleAction('view', student._id)}>View</button>
                    <button className="action-btn edit-btn" onClick={() => handleAction('edit', student._id)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => handleAction('delete', student._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="add-btn" onClick={()=>navigate('/studenthome')}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Student;
