const express = require("express");
const router = express.Router();
const authMiddlware = require("../middlware/authMiddlware");

transcriptControllers = require("../controllers/transcriptControllers");

//POST
router.post(
  "/",
  authMiddlware.userAuth,
  authMiddlware.userCheckRole(["staff", "admin"]),
  transcriptControllers.createTranscript
);

//GET
router.get(
  "/:studentId",
  authMiddlware.userAuth,
  authMiddlware.userCheckRole(["admin", "staff", "student"]),
  transcriptControllers.getTranscripts
);
router.get(
  "/taken/courses/:id",
  authMiddlware.userAuth,
  authMiddlware.userCheckRole(["admin", "staff", "student"]),
  transcriptControllers.getTakenCoursesForStudent
);

module.exports = router;
