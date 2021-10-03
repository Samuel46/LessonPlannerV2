const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a lesson title"],
    unique: true,
  },
  week: {
    type: String,
    required: [true, "Please allocate a day of week📅"],
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  objective: {
    type: String,
    // required: [true, "Please add a lesson Objective"],
  },
  procedures: {
    type: String,
    // required: [true, "Please add a lesson procedures"],
  },

  homework: {
    type: String,
    // required: [false, "Please add a lesson homework"],
  },
  accommodations: {
    type: String,
    // required: [false, "Please add a lesson Objective "],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  curriculum: {
    type: mongoose.Schema.ObjectId,
    ref: "Curriculum",
    // required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Lesson", LessonSchema);
