import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCoursebyId } from '../service/courseApi';
import './global.css';

const ViewStudent = () => {
    const navigate=useNavigate()
    const {courseid} = useParams();
    console.log(courseid)
    const [course, setCourse] = useState();
    console.log(course)

    useEffect(()=>{
        async function fetchCourseId(){
           const data = await fetchCoursebyId(courseid);
           const dataArray = Array.isArray(data) ? data : [data];
           setCourse(dataArray);    
        }
        if(courseid && courseid !== ""){
            fetchCourseId()
        }
        
    },[courseid])

    function handlebtn(){
      navigate('/course')
    }

    return(
        <div className="form">
        <div className="add-box">
          <h2 className="heading">Course Details</h2>
          {Array.isArray(course) && course.map((course) => (
            <ul key={course.courseId}>
              <p><strong>Course Id:</strong> {course.courseId}</p>
              <p><strong>Course Name:</strong> {course.courseName}</p>
              <p><strong>CreditHours:</strong> {course.creditHours}</p>
              <p><strong>Status:</strong> {course.status}</p>
            </ul>
          ))}
          <button class="add-btn" onClick={handlebtn}>Back</button>
        </div>
      </div>
  

    );

};
export default ViewStudent;