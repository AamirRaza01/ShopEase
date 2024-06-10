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

router.get("/mycart", isLoggedIn, async function(req, res){
  try {
      let user = await userModel.findOne({ email: req.user.email }).populate("cart")
      res.render("mycart", {user})
  } catch (error) {
      res.send(error.message)
  }
})

module.exports = router;
