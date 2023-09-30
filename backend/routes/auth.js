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

    const user = UserSchema(req.body);
    UserSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        // user => res.json(user)
        user => user.save()
    })


    obj = {
        saved:"Yes",
    }
    // console.log(req.body);
    // console.log(user);
    // placeing some checks here like mail mein @something, name mein phone no. nahi and all  
    // user.save()
    // res.send(obj)
    res.json(obj);
})

module.exports = router