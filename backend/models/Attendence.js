const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  studentName: {    // <-- Save name not ID
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
