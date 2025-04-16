import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import ViewStudent from './components/ViewStudent';
import AddTeacher from './components/AddTeacher';
import EditTeacher from './components/EditTeacher';
import DeleteTeacher from './components/DeleteTeacher';
import ViewTeacher from './components/ViewTeacher';

function App() {
  return (
    <Router>
      <Routes>
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



      </Routes>
    </Router>
   
  );
}

export default App;
