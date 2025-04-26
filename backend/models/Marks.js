const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Marks', MarksSchema);
