// Routes ke liye express

const express = require('express')
const router = express.Router();
const UserSchema = require('../models/User')
const { body, query, validationResult } = require("express-validator");

// get request mein bbhi save toh kar skte par log's mein aa skta data so use post for such cases 
router.post('/' , 
    
    [ 
        body('email', 'Please Enter a Valid Email').isEmail() , 
        body('name', 'Name cannot be Empty' ).notEmpty() , 
        body('password' , 'Password must of length 5' ).isLength({min:5})  
    ]

    , (req,res) => {

    const checkResult = validationResult(req)
    if (!checkResult.isEmpty()) {
      return res.status(400).json({ checkResult: checkResult.array() });
    }

   const { name, email, password } = req.body;

   UserSchema.findOne({ email })
     .then((existingUser) => {
       if (existingUser) {
         return res
           .status(400)
           .json({ errors: [{ msg: "Email is already in use" }] });
       }

       const user = new UserSchema({
         name,
         email,
         password,
       });

       res.json({ saved: "Yes" });
       return user.save();
     })
     .catch((err) => {
       console.error(err);
       res.status(500).json({ msg: "Server error" });
     });

})

module.exports = router