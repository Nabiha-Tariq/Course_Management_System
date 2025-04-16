const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using POST "/api/Teacher/createTeacher" .No login required
router.post('/createTeacher',[
    body('firstName','Enter a valid name').isLength({min: 3}),
    body('lastName','Enter a valid last name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must atleast 5 characheters').isLength({min: 5})
  ],async (req, res) => {
  // if there are errors return bad request and the errors
    const errors= validationResult(req);
   if (!errors.isEmpty()) {
      res.status(400).json({ errors:errors.array() });
    }
  
    // check the whether student with this email exists already
  
    try{
  
    let teacher =await Teacher.findOne({email: req.body.email});
    if(teacher){
      return res.status(400).json({errors:"Sorry a admin with this email have already exist"})
    }
    teacher= await Teacher.create({
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
  
  router.put('/createTeacher/:teacherid', [
    body('firstName', 'Enter a valid first name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('status', 'Status is required').notEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { teacherid } = req.params;
    const { firstName, lastName, email, status } = req.body;
  
    try {
      let teacher = await Teacher.findById(teacherid);
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Update fields
      teacher.firstName = firstName;
      teacher.lastName = lastName;
      teacher.email = email;
      teacher.status = status;
  
      const updatedTeacher = await teacher.save();
  
      return res.status(200).json({
        message: 'Student updated successfully',
        teacher: updatedTeacher
      });
  
    } catch (error) {
      console.error('Error updating teacher:', error.message);
      return res.status(500).send('Server error');
    }
  });

  router.get('/createTeacher', async (req, res) => {
    try {
      const teacher = await Teacher.find();
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching teacher' });
    }
  });

  router.get('/:teacherid', async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.teacherid);
      if (!teacher) return res.status(404).json({ message: 'Student not found' });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/deleteTeacher/:teacherid', async (req, res) => {
    try {
      const { teacherid } = req.params;
  
      // Find the student by ID and delete
      const teacher = await Teacher.findByIdAndDelete(teacherid);
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error('Error deleting teacher:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  module.exports = router