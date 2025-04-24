import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Course from './pages/Course';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import ViewStudent from './components/ViewStudent';
import AddTeacher from './components/AddTeacher';
import EditTeacher from './components/EditTeacher';
import DeleteTeacher from './components/DeleteTeacher';
import ViewTeacher from './components/ViewTeacher';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import ViewCourse from './components/ViewCourse';
import DeleteCourse from './components/DeleteCourse';
import Loginsignup from './pages/Loginsignup';
import Studentlogin from './components/Studentlogin';
import Teacherlogin from './components/Teacherlogin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginsignup/>}/>
        <Route path="/login/studentlogin" element={<Studentlogin/>}/>
        <Route path="/login/teacherlogin" element={<Teacherlogin/>}/>



        <Route path="/student" element={<Student />} />
        <Route path="/student/add-student" element={<AddStudent/>}/>
        <Route path="/student/view-student/:studentid" element={<ViewStudent/>}/>
        <Route path="/student/edit-student/:studentid" element={<EditStudent/>}/>
        <Route path="/student/delete-student/:studentid" element={<DeleteStudent/>}/>

        <Route path="/teacher" element={<Teacher/>} />
        <Route path="/teacher/add-teacher" element={<AddTeacher/>}/>
        <Route path="/teacher/view-teacher/:teacherid" element={<ViewTeacher/>}/>
        <Route path="/teacher/edit-teacher/:teacherid" element={<EditTeacher/>}/>
        <Route path="/teacher/delete-teacher/:teacherid" element={<DeleteTeacher/>}/>

        <Route path='/course' element={<Course/>}/>
        <Route path="/course/add-course" element={<AddCourse/>}/>
        <Route path="/course/view-course/:courseid" element={<ViewCourse/>}/>
        <Route path="/course/edit-course/:courseid" element={<EditCourse/>}/>
        <Route path="/course/delete-course/:courseid" element={<DeleteCourse/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
