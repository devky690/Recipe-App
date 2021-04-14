const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Gets all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    console.log(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Gets a single User
router.get("/:id", getUser, (req, res) => {
  console.log(res.user);
  res.json(res.user);
});

//Creates a User
router.post("/", async (req, res) => {
  //controller connects to model
  const user = new User({
    name: req.body.name,
  });

  //controller does its logic and handles errors and successes
  //no view needed
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
    let user;
    try {  
      user = await User.findById(req.params.id);
      if (user == null) {
        console.log("Cannot find user");
        return res.status(404).json({ message: "Cannot find User" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
    
    res.user = user;

    next();
  }

module.exports = router;
