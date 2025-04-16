import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTeacherbyId } from '../service/TeacherApi';
import './global.css';

const ViewTeacher = () => {
    const navigate=useNavigate()
    const {teacherid} = useParams();
    console.log(teacherid)
    const [teacher, setTeacher] = useState();
    console.log(teacher)

    useEffect(()=>{
        async function fetchTeacherId(){
           const data = await fetchTeacherbyId(teacherid);
           const dataArray = Array.isArray(data) ? data : [data];
           setTeacher(dataArray);    
        }
        if(teacherid && teacherid !== ""){
            fetchTeacherId()
        }
        
    },[teacherid])

    function handlebtn(){
      navigate('/teacher')
    }

    return(
        <div className="form">
        <div className="add-box">
          <h2 className="heading">Teacher Details</h2>
          {Array.isArray(teacher) && teacher.map((teacher) => (
            <ul key={teacher._id}>
              <p><strong>Id:</strong> {teacher._id}</p>
              <p><strong>First Name:</strong> {teacher.firstName}</p>
              <p><strong>Last Name:</strong> {teacher.lastName}</p>
              <p><strong>Email:</strong> {teacher.email}</p>
              <p><strong>Status:</strong> {teacher.status}</p>
            </ul>
          ))}
          <button class="add-btn" onClick={handlebtn}>Back</button>
        </div>
      </div>
  

    );

};
export default ViewTeacher;