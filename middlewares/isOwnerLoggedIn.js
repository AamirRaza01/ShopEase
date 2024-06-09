const jwt = require("jsonwebtoken")
const ownerModel = require("../models/owner");

module.exports = async function(req, res, next){
    if(!req.cookies.OwnerToken){
        req.flash("error", "You need to login first");
        return res.redirect("/owners/login")
    }

    try {
        let decoded = jwt.verify(req.cookies.OwnerToken, process.env.JWT_KEY)
        // res.send(decoded)
        let owner = await ownerModel.findOne({email : decoded.email}).select("-password")
        
        req.owner = owner;
        // res.send(user)
        next()
    } catch (error) {
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }

}