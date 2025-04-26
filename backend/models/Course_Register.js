const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseregisterSchema = new Schema({
  courseId:{
    type : String,
    required: true,
  },
  studentId:{
    type : String,
    required: true
  },
});

module.exports = mongoose.model('courseRegister',CourseregisterSchema);