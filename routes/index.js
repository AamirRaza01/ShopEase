const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const router = express.Router();

router.get("/", function (req, res){
    let error = req.flash("error")
    res.render("index", {error})
})

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find()
    res.render("shop", {products})  
})

router.get("/admin", isOwnerLoggedIn, async function(req, res){
    let products = await productModel.find()
    res.render("admin", {products})  
})


module.exports = router;