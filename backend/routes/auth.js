// Routes ke liye express

const express = require('express')
const router = express.Router();
const UserSchema = require('../models/User')


// get request mein bbhi save toh kar skte par log's mein aa skta data so use post for such cases 
router.post('/' , (req,res) => {
    obj = {
        saved:"Yes",
    }
    // console.log(req.body);
    const user = UserSchema(req.body);
    console.log(user);
    // user.save()
    res.send(obj)
    // res.json(obj);
})

module.exports = router