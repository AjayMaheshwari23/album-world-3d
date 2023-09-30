require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const express = require("express");

const connect_function = () => {
  try {
    mongoose.connect(mongoURI);
    console.log("success!!");
  } catch (error) {
    console.log(error);
  }
};

const app = express();
const port = 3000;

app.use(express.json()) // To access req.something 

// Available Routes - Creating Endpoints 
app.use('/api/auth' , require('./routes/auth') )

app.get("/", (req, res) => {
  res.send("I am sending");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = connect_function;
