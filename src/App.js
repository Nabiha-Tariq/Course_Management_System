import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import ViewStudent from './components/ViewStudent';


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
        <Route path="/add-student" element={<AddStudent/>}/>
        <Route path="/edit-student" element={<EditStudent/>}/>
        <Route path="/delete-student" element={<DeleteStudent/>}/>



      </Routes>
    </Router>
   
  );
}

export default App;
