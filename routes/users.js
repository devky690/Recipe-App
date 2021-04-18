const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

//Creates a User, Registers user
router.post("/", async (req, res) => {
  //controller connects to model
  const user = new User({
    name: req.body.name,
  });

  //controller does its logic and handles errors and successes
  //no view needed
  try {
    //on request, destructure name, password, passwordverify
    const { username, password, passwordVerify } = req.body;

    //validation
    if (!username || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });
    }
    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice." });
    }
    //finds account where username field (mongo docs) : matches username field from user req.body
    //or just say username by itself
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "An account with this email already exists." });
    }

    //hash the password
    //generates a salt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //console.log(passwordHash);
    //save a new user account to the db
    const newUser = new User({
      username,
      passwordHash,
    });
    //save document to database
    const savedUser = await newUser.save();

    ///sign the token

    const token = jwt.sign(
      //payload, mongo id in mongodb is considers id as _id from objectid
      {
        user: savedUser._id,
      },
      //for signing (encrypting)...used to verify payload as well login as well
      //nothing stored in db, server just uses it
      process.env.JWT_SECRET
    );
    console.log(token);

    //name of cookie is token, jwt is token stored in cookie.
    //using cookie so user can stay logged in
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    //this part not needed
    return res.status(201).json(newUser);
  } catch (err) {
    //dev error
    console.log(err);
    return res.status(500).json({ message: err.message });
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
