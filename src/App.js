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
import Studenthome from './pages/Studenthome';
import Teacherhome from './pages/Teacherhome';
import Adminlogin from './components/Adminlogin';
import AdminHome from './pages/AdminHome';
import Protectedroute from './Protectedroutes';
import CourseRegister from './pages/CourseRegister';
import StudentAttendence from './pages/StudentAttendence';
import StudentMarks from './pages/StudentMarks';
import TeacherAttendence from './pages/TeacherAttendence';
import TeacherMarks from './pages/TeacherMarks';
import Home from './Home';



function App() {
  return (
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/login" element={<Loginsignup/>}/>
        <Route path="/login/studentlogin" element={<Studentlogin/>}/>
        <Route path="/login/teacherlogin" element={<Teacherlogin/>}/>
        <Route path="/login/adminlogin" element={<Adminlogin/>}/>

        <Route path="/marks" element=
            {<Protectedroute allowedRoles={['student']}>
                <StudentMarks/>
            </Protectedroute>}
        />

        <Route path="/teachermarks" element=
            {<Protectedroute allowedRoles={['teacher']}>
                <TeacherMarks/>
            </Protectedroute>}
        />

        <Route path="/attendence" element=
            {<Protectedroute allowedRoles={['student']}>
                <StudentAttendence/>
            </Protectedroute>}
        />

        <Route path="/teacherAttendence" element=
            {<Protectedroute allowedRoles={['teacher']}>
                <TeacherAttendence/>
            </Protectedroute>}
        />

        <Route path="/register" element=
            {<Protectedroute allowedRoles={['student']}>
                <CourseRegister/>
            </Protectedroute>}
        />
        
        <Route path="/studenthome" element=
            {<Protectedroute allowedRoles={['student']}>
                <Studenthome/>
            </Protectedroute>}
        />
        <Route path="/teacherhome" element=
            {<Protectedroute allowedRoles={['teacher']}>
                <Teacherhome/>
            </Protectedroute> }
        />
        <Route path="/adminhome" element=
            {<Protectedroute allowedRoles={["admin"]}>
                <AdminHome/>
            </Protectedroute>}
        />


        <Route path="/student" element={
          <Protectedroute allowedRoles={["admin"]}>
            <Student />
          </Protectedroute>
        }/>
        <Route path="/student/add-student" element={
            <Protectedroute allowedRoles={["admin"]}>
                <AddStudent/>
            </Protectedroute>
        }/>

        <Route path="/student/view-student/:studentid" element={
            <Protectedroute allowedRoles={["admin"]}>
                <ViewStudent/>
            </Protectedroute>}
        />
        <Route path="/student/edit-student/:studentid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <EditStudent/>
            </Protectedroute>}
        />
        <Route path="/student/delete-student/:studentid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <DeleteStudent/>
            </Protectedroute> }
        />



        <Route path="/teacher"  element=
            {<Protectedroute allowedRoles={["admin"]}>
                <Teacher/>
            </Protectedroute> }
        />
        <Route path="/teacher/add-teacher"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <AddTeacher/>
            </Protectedroute>}
        />
        <Route path="/teacher/view-teacher/:teacherid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <ViewTeacher/>
            </Protectedroute>  }
        />
        <Route path="/teacher/edit-teacher/:teacherid" element=
            {<Protectedroute allowedRoles={['admin']}>
                <EditTeacher/>
            </Protectedroute> }
        />
         <Route  path="/teacher/delete-teacher/:teacherid" element=
            {<Protectedroute allowedRoles={['admin']}>
                <DeleteTeacher/>
            </Protectedroute> }
        />


        <Route path="/course"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <Course/>
            </Protectedroute>}
        />
        <Route path="/course/add-course"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <AddCourse/>
            </Protectedroute> }
        />
        <Route path="/course/view-course/:courseid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <ViewCourse/>
            </Protectedroute> }
        />
        <Route path="/course/edit-course/:courseid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <EditCourse/>
            </Protectedroute>}
        />
        <Route path="/course/delete-course/:courseid"  element=
            {<Protectedroute allowedRoles={['admin']}>
                <DeleteCourse/>
            </Protectedroute>}
        />
        
      </Routes>
   
  );
}

export default App;
