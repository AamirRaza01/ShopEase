const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require("../models/product");
const { productStorage } = require("../controllers/productController");


router.get("/", function (req, res) {
  res.send("working product page");
});

router.post("/create", upload.single("image"), productStorage);

module.exports = router;
