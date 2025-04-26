const express = require('express');
const CourseRegister = require('../models/Course_Register'); // your model
const router = express.Router();
const { body, validationResult } = require('express-validator');

// POST route to register courses
router.post('/createRegister', async (req, res) => {
  const { studentId, selectedCourses } = req.body;

  try {
    const registrations = selectedCourses.map((courseId) => ({
      studentId,
      courseId,
    }));

    await CourseRegister.insertMany(registrations); // use correct model here

    res.status(200).json({ message: 'Courses registered successfully!' });
  } catch (error) {
    console.error('Error registering courses:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// GET route to fetch all course registrations
router.get('/createRegister', async (req, res) => {
  try {
    const courseReg = await CourseRegister.find();
    res.json(courseReg);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching courseReg' });
  }
});


module.exports = router;
