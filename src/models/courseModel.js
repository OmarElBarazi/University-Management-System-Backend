const mongoose = require("mongoose");

//REQUIRE MODEL FOR REFERINCING
const User = require("../models/userModel");

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  available: {
    type: Boolean,
  },
  day: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
