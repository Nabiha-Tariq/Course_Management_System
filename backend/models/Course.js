const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseId:{
    type : String,
    required: true,
    unique: true
  },
  courseName:{
    type : String,
    required: true
  },
  creditHours:{
    type : Number,
    required: true
  },
  teacherId:{
    type: String,
    required: true
  },
  status:{
    type : String,
    required: true,
    
  },
});

module.exports = mongoose.model('course',courseSchema);