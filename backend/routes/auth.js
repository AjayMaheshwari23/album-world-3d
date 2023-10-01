// Routes ke liye express
require("dotenv").config();
const express = require('express')
const router = express.Router();
const UserSchema = require('../models/User')
const { body, query, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')


router.post(
  "/",
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("name", "Name cannot be Empty").notEmpty(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5, }),
  ],
  async (req, res) => {
    const checkResult = validationResult(req);

    if (!checkResult.isEmpty()) {
      return res.status(400).json({ errors: checkResult.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await UserSchema.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email is already in use" }] });
      }

      const salt = await bcrypt.genSalt(10); 
      const hashPass = await bcrypt.hash(password,salt);

      // console.log(hashPass);

      const user = new UserSchema({
        name,
        email,
        password: hashPass,
      });

      const data = {
        user: {
          id: user.id
        }
      }

      const jwtToken = jwt.sign(data,JWT_SECRET);
      console.log(jwtToken);

      await user.save();
      // res.json({ saved: "user Created Successfully! Go Ahead and login" });
      res.json( { jwtToken: jwtToken } );

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server error" });
    }
  }
);



// For login : - 
router.post(
  "/login",
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password cannot be Empty").notEmpty(),
  ],

  async (req, res) => {
    const checkResult = validationResult(req);

    if (!checkResult.isEmpty()) {
      return res.status(400).json({ errors: checkResult.array() });
    }

    const { email, password } = req.body;

    try {
     
      let exists = await UserSchema.findOne({ email });
      if(!exists){
        return res.status(400).json({error: "Invalid Credentials"});
      }

      const passwordok = await bcrypt.compare(password , exists.password);
      if(!passwordok) return res.status(400).json({error: "Invalid Credentials"})

      const data = {
        user: {
          id: exists.id,
        },
      };
  
      const jwtToken = jwt.sign(data,JWT_SECRET);
      res.json({ jwtToken: jwtToken });

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server error" });
    }
  }
);


// For getting loggedin User details : - 
router.post(
  "/getuser",
  fetchuser
 , async (req, res) => {
    
    try {
      
      userId = req.user.id;
      const user = await UserSchema.findById(userId).select("-password");
      res.json(user)

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server error" });
    }
  }
);


module.exports = router