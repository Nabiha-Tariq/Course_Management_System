const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using POST "/api/Course/createCourse" .No login required
router.post('/createCourse',[
    body('courseId','Enter a valid id').isLength({min: 3}),
    body('courseName','Enter a valid name').isLength({min: 3}),
    body('creditHours', 'Enter valid credit hours').isNumeric(),
],async (req, res) => {
  // if there are errors return bad request and the errors
    const errors= validationResult(req);
   if (!errors.isEmpty()) {
      res.status(400).json({ errors:errors.array() });
    }

    try{

    let course =await Course.findOne({ courseId: req.body.courseId});
    if(course){
      return res.status(400).json({errors:"Sorry a courseId is aleardy exist"})
    }
    course= await Course.create({
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        creditHours: 3,
        status: "inactive"
    })

    res.json({"message":"save successfully"})
  }catch(error){
    console.error(error.message)
    res.status(500).send("some error occur")
  }
  });

  router.get('/createCourse', async (req, res) => {
    try {
      const course = await Course.find();
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching course' });
    }
  });

  router.get('/:courseid', async (req, res) => {
    try {
      console.log("Incoming courseId:", req.params.courseid);
      const course = await Course.findOne({ courseId: req.params.courseid });
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/createCourse/:courseid', [
    body('courseId', 'Enter a valid Id').isLength({ min: 3 }),
    body('courseName', 'Enter a valid  name').isLength({ min: 3 }),
    body('creditHours', 'Enter a valid crerdithours').isNumeric(),
    body('status', 'Status is required').notEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { courseid } = req.params;
    const { courseId, courseName, creditHours, status } = req.body;
  
    try {
      const course = await Course.findOne({ courseId: req.params.courseid });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Update fields
      course.courseId = courseId;
      course.courseName = courseName;
      course.creditHours = creditHours;
      course.status = status;
  
      const updatedCourse = await course.save();
  
      return res.status(200).json({
        message: 'Course updated successfully',
        course: updatedCourse
      });
  
    } catch (error) {
      console.error('Error updating course:', error.message);
      return res.status(500).send('Server error');
    }
  });

  router.delete('/deleteCourse/:courseid', async (req, res) => {
    try {
      const { courseid } = req.params;
  
      const deletedCourse = await Course.findOneAndDelete({ courseId: courseid });
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  module.exports = router