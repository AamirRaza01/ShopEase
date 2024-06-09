const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { registerUser, loginUser, logOutUser } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", function (req, res) {
  res.send("working users page");
});

router.post("/register", registerUser )

router.post("/login", loginUser )

router.get("/logout", isLoggedIn, logOutUser )

module.exports = router;
