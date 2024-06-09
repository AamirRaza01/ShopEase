const ownerModel = require("../models/owner");
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken")


module.exports.createOwner =  async function (req, res) {
    try {
      let owners = await ownerModel.find();
  
      if (owners.length > 0) {
        // return res.status(503).send("Not authorized to create owner");
        req.flash("error1", "Not authorized to create owner")
        return res.redirect("/owners")
      }
  
      const { fullName, email, password } = req.body;
  
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
          if(err) return res.send(err.message)
          else{
            let createdOwner = await ownerModel.create({
              fullName,
              email,
              password : hash
            });
            
            let OwnerToken  = generateToken(createdOwner);
            res.cookie("token", OwnerToken)
            req.flash("success", "Owner created successfully, login to your account")
            return res.redirect("/owners/login")
          }
        })
      })
    } catch (error) {
      res.send(error.message);
    }
  }


  module.exports.loginOwner = async function(req, res){
    try {
        const {email, password} = req.body
        let owner = await ownerModel.findOne({email})
        if(!owner){
            return res.send("Email or password incorrect")
        }

        bcrypt.compare(password, owner.password, function(err, result){
            if(result){
                let OwnerToken = generateToken(owner)
                res.cookie("OwnerToken", OwnerToken)
                res.redirect("/admin")
            }else{
                req.flash("error2", "Email or password incorrect")
                return res.redirect("/owners/login")
            }
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
  }

  module.exports.logOutOwner =  function(req, res){
    try {
      res.cookie("OwnerToken", "")
      res.redirect("/owners/login")
    } catch (error) {
      res.status(501).send(error.message)
    }
  }