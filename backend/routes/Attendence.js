const express = require('express');
const Attendance = require('../models/Attendence');
const router = express.Router();

// POST route to save attendance
router.post('/createAttendance', async (req, res) => {
  try {
    const { teacherId, courseId, studentName, date, status } = req.body;

    // Validation
    if (!teacherId || !courseId || !studentName || !date || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newAttendance = new Attendance({
      teacherId,
      courseId,
      studentName, 
      date,
      status,
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'Failed to save attendance' });
  }
});

// (Optional) GET route to fetch all attendance records
router.get('/createAttendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching attendance records' });
  }
});

module.exports = router;
