const mongoose = require("mongoose");

const transcriptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    enum: ["fall", "spring"],
    required: true,
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
    },
  ],
  gpa: { type: Number, required: true },
  cgpa: { type: Number, required: true },
});

const Transcript = mongoose.model("Transcript", transcriptSchema);

module.exports = Transcript;
