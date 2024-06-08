const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser  = async function(req, res){
    try {
      const {fullName, email, password}  = req.body;

      let foundUser  = await userModel.findOne({email : email})
      if(foundUser) {
        req.flash("error", "User already exist, try login")
        return res.redirect("/")
      }
  
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
          if(err) return res.send(err.message)
          else{
            let createdUser = await userModel.create({
              fullName,
              email,
              password : hash
            })
            
            let token  = generateToken(createdUser);
            res.cookie("token", token)
            // res.send("User created successfully")
          }
        })
      })
      
  
      
    } catch (error) {
      res.send(error.message)
    }
  }

  //for login
  module.exports.loginUser = async function(req, res){
    try {
        let {email, password} = req.body;
        let foundUser = await userModel.findOne({email});
        if(!foundUser) return res.status(404).send("Email or password incorrect")

        bcrypt.compare(password, foundUser.password, function(err, result){
            if(result){
                let token  = generateToken(foundUser);
                res.cookie("token", token)
                res.send("You can login")
            }else{
                return res.status(404).send("Email or password incorrect")
            }
        })    
    } catch (error) {
        res.send(error.message)
    }
  }