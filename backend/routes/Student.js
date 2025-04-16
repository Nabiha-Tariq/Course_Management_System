const express = require('express');
const Student = require('../models/Student');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using POST "/api/Student/createStudent" .No login required
router.post('/createStudent',[
  body('firstName','Enter a valid name').isLength({min: 3}),
  body('lastName','Enter a valid last name').isLength({min: 3}),
  body('email','Enter a valid email').isEmail(),
 // body('password','Password must atleast 5 characheters').isLength({min: 5})
],async (req, res) => {
// if there are errors return bad request and the errors
  console.log(JSON.stringify(req.body));
  const errors= validationResult(req);
 if (!errors.isEmpty()) {
    res.status(400).json({ errors:errors.array() });
  }

  // check the whether student with this email exists already
  
  try{

  let student =await Student.findOne({email: req.body.email});
  if(student){
    return res.status(400).json({errors:"Sorry a admin with this email have already exist"})
  }
  student= await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: "randomPassword",
      status: "inactive"
  })

  res.json({"message":"save successfully"})
}catch(error){
  console.error(error.message)
  res.status(500).send("some error occur")
}
});



router.put('/createStudent/:studentid', [
  body('firstName', 'Enter a valid first name').isLength({ min: 3 }),
  body('lastName', 'Enter a valid last name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('status', 'Status is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { studentid } = req.params;
  const { firstName, lastName, email, status } = req.body;

  try {
    let student = await Student.findById(studentid);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update fields
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.status = status;

    const updatedStudent = await student.save();

    return res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent
    });

  } catch (error) {
    console.error('Error updating student:', error.message);
    return res.status(500).send('Server error');
  }
});

router.get('/createStudent', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

router.get('/:studentid', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentid);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deleteStudent/:studentid', async (req, res) => {
  try {
    const { studentid } = req.params;

    // Find the student by ID and delete
    const student = await Student.findByIdAndDelete(studentid);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router