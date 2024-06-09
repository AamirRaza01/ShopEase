const express = require("express");
const router = express.Router();
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");

const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken");
const { createOwner, loginOwner, logOutOwner } = require("../controllers/ownerAuthController");

router.get("/", function(req, res){
  let error = req.flash("error1")
  res.render("createOwner", {error})
})

router.get("/login", function(req, res){
  let incorrectCredentialError = req.flash("error2")
  let withoutLoginAccess = req.flash("error")
  let ownerCreationSuccess = req.flash("success")
  res.render("owner-login", {incorrectCredentialError, ownerCreationSuccess, withoutLoginAccess })
})

router.post("/create", createOwner);

router.post("/login", loginOwner);

router.get("/logout", isOwnerLoggedIn, logOutOwner  )


router.get("/addproducts", isOwnerLoggedIn, function (req, res) {
  let success = req.flash("success")
  res.render("createproducts", {success});
});

module.exports = router;
