const productModel = require("../models/product");

module.exports.productStorage = async (req, res) => {
    try {
     const { name, price, discount, bgColor, panelColor, textColor } =
     req.body;
     let product = await productModel.create({
       image : req.file.buffer,
       name,
       price,
       discount,
       bgColor,
       panelColor,
       textColor,
     });
     req.flash("success", "Product created successfully")
     res.redirect("/owners/addproducts")
    } catch (error) {
     res.send(error.message)
    }
   }