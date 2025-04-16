import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStudentbyId } from '../service/studentApi';
import './global.css';

const ViewStudent = () => {
    const navigate=useNavigate()
    const {studentid} = useParams();
    console.log(studentid)
    const [student, setStudent] = useState();
    console.log(student)

    useEffect(()=>{
        async function fetchStudentId(){
           const data = await fetchStudentbyId(studentid);
           const dataArray = Array.isArray(data) ? data : [data];
           setStudent(dataArray);    
        }
        if(studentid && studentid !== ""){
          fetchStudentId()
        }
        
    },[studentid])

    function handlebtn(){
      navigate('/student')
    }

    return(
        <div className="form">
        <div className="add-box">
          <h2 className="heading">Student Details</h2>
          {Array.isArray(student) && student.map((student) => (
            <ul key={student._id}>
              <p><strong>Id:</strong> {student._id}</p>
              <p><strong>First Name:</strong> {student.firstName}</p>
              <p><strong>Last Name:</strong> {student.lastName}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Status:</strong> {student.status}</p>
            </ul>
          ))}
          <button class="add-btn" onClick={handlebtn}>Back</button>
        </div>
      </div>
  

    );

};
export default ViewStudent;