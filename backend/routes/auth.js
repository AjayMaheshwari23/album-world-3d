// Routes ke liye express
require("dotenv").config();
const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");
const { body, query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/createuser",
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("name", "Name cannot be Empty").notEmpty(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const checkResult = validationResult(req);
    let success = false;
    if (!checkResult.isEmpty()) {
      return res.status(400).json({ success, errors: checkResult.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await UserSchema.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Email is already in use" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      // console.log(hashPass);

      const user = new UserSchema({
        name,
        email,
        password: hashPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(data, JWT_SECRET);
      console.log(jwtToken);

      await user.save();
      success = true;
      // res.json({ saved: "user Created Successfully! Go Ahead and login" });
      res.json({ success, jwtToken: jwtToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success, msg: "Internal Server error" });
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
    let success = false;

    if (!checkResult.isEmpty()) {
      return res.status(400).json({ success, errors: checkResult.array() });
    }

    const { email, password } = req.body;

    try {
      let exists = await UserSchema.findOne({ email });
      if (!exists) {
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const passwordok = await bcrypt.compare(password, exists.password);
      if (!passwordok)
        return res.status(400).json({ success, error: "Invalid Credentials" });

      const data = {
        user: {
          id: exists.id,
        },
      };

      const jwtToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, jwtToken: jwtToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server error" });
    }
  }
);

// For getting loggedin User details : -
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserSchema.findById(userId).select("-password");
    if (user === null)
      return res.json({ message: "User Not Found", data: null });
    return res.json({
      message: "Successfully retrieved user data",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server error" });
  }
});

module.exports = router;
