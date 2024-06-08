const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/", function (req, res) {
  res.send("working users page");
});

router.post("/register", registerUser )

router.post("/login", loginUser )

module.exports = router;
