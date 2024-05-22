const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("working product page");
});

module.exports = router;
