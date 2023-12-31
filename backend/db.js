require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const express = require("express");
const cors = require("cors");

const connect_function = () => {
  try {
    mongoose.connect(mongoURI);
    console.log("success!!");
  } catch (error) {
    console.log(error);
  }
};

const app = express();
const port = 5000;

app.use(express.json()) // To access req.something 
app.use(cors());

// Available Routes - Creating Endpoints 
app.use('/api/auth' , require('./routes/auth') )

app.get("/", (req, res) => {
  res.send("I am sending");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = connect_function;
