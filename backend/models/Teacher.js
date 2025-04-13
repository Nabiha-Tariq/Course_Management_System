import mongoose from 'mongoose';
const { Schema } = mongoose;

const teacherSchema = new Schema({
  firstName:{
    type : String,
    required: true
  },
  lastName:{
    type : String,
    required: true
  },
  email:{
    type : String,
    required: true,
    unique: true
  },
  password:{
    type : String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('teacher',teacherSchema);