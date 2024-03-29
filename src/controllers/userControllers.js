const User = require("../models/userModel");
const TimeTable = require("../models/timeTableModel");

//Create Staff and student Users
exports.createUserAccount = async (req, res) => {
  try {
    const { role, advisor, ...userData } = req.body; // extract role and advisor from req.body
    const newUser = new User({
      ...userData,
      role: role.toLowerCase(), // make sure role is lowercase
    });

    console.log(newUser);
    if (newUser.role === "staff") {
      // if role is staff, create new user with role staff and take req.body rest for his information
      await newUser.save();
      res.status(200).json({ user: newUser });
    } else if (newUser.role === "student") {
      // if role is student, search for advisor name and populate the advisor with the id of the matching user
      const advisorUser = await User.findOne({ _id: advisor });
      if (!advisorUser) throw new Error("Advisor not found");

      const studentUser = new User({
        ...userData,
        role,
        advisor,
      });
      await studentUser.save();

      res.status(200).json({ user: studentUser });

      //Create Empty TimeTable for the Student
      const timeTable = new TimeTable({
        studentId: studentUser._id,
      });

      await timeTable.save();
    } else {
      throw new Error("Invalid role");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all users with role 'staff'
exports.getStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" });
    res.status(200).json({ staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users with role 'student'
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).populate({
      path: "advisor",
      model: "User",
    });
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all students related to a specific advisor
exports.getStudentsByAdvisor = async (req, res) => {
  try {
    const advisor = await User.findById(req.params.advisorId);
    if (!advisor || advisor.role !== "staff") {
      return res.status(404).json({ message: "Advisor not found" });
    }

    const students = await User.find({ advisor: advisor._id }).populate({
      path: "advisor",
      model: "User",
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(user, req.body); // Update only the fields present in req.body
    const updatedUser = await user.save();
    res.json({ user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete Staff or Student Users
exports.deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
