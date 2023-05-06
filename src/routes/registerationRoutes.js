const express = require("express");
const router = express.Router();

const registerationController = require("../controllers/registerationControllers");

//Routes for the users

//POST
router.post("/signup", registerationController.userSignUp);

router.post("/login", registerationController.userLogin);

module.exports = router;
