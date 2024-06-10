const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product");
const userModel = require("../models/user");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products });
});

router.get("/admin", isOwnerLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("admin", { products });
});

router.get("/shop/:id", isLoggedIn, async function (req, res) {
  let product = await productModel.findOne({ _id: req.params.id });
  // res.send(product)
  let success = req.flash("success");
  res.render("view-product", { product, success });
});

router.get("/buy-now/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id });
    // res.send(product)
    let success = req.flash("success");
    res.render("cart", { product, success });
  });


router.get("/mycart/:id", isLoggedIn, async function (req, res) {
  try {
    let productID = req.params.id;
    let user = await userModel.findOne({ email: req.user.email });

    user.cart.push(productID);
    await user.save();
    req.flash("success", "Product added successfully"); 
    res.redirect(`/shop/${productID}`);
    // res.send(user)
    // console.log(user)
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/remove-from-cart/:id", isLoggedIn, async function(req, res){
    try {
        let productID = req.params.id;
        // let deletedProduct = await productModel.findOneAndDelete(productID);
        let user = await userModel.findOne({email: req.user.email})
        user.cart = user.cart.filter(product => product.toString() != productID )
        await user.save()
        res.redirect("/users/mycart")
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;
