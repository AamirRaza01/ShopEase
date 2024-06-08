const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");

router.post("/create", async function (req, res) {
  try {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("Not authorized to create owner");
    }

    const { fullName, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password
    });
  
    res.status(203).send(createdOwner);

  } catch (error) {
    res.send(error.message);
  }
});

router.get("/", function (req, res) {
  res.send("working owner page");
});

module.exports = router;
