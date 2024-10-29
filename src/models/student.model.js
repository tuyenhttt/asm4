const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  studentCode: {
    type: String,
    require: true,
    unique: true,
  },
}); 
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
