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
// router.get("/:id", getUser, (req, res) => {
//   console.log(res.user);
//   res.json(res.user);
// });

//Creates a User, Registers user
router.post("/register", async (req, res) => {
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

    console.log(passwordHash + "\n");
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
    //.redirect("/");
    //this path's actions end from above, promise is returned...
    //so how should i handle redirect?
  } catch (err) {
    //dev error
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const existingUser = await User.findOne({ username });
    //unauthorized request, with password and email you dont want
    //to be precise...dont want hacker to brute force
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    //returns true if password from req.body is the same
    //as password from mongodb from existing user
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    //sign (encrypt id of existing user) with secret key
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );
    // send cookie token to maintain session with jwt
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    //dev error
    console.log(err);
  }
});

//if this doesnt work, use devistry localstorage
//test with no body for logout

//no need for async because no database operation
//to logout simply clear the cookie or clear local storage
//this may work in browser, but not in postman...test later..if it doesnt work
//then just set cookies through javascript and not http only
router.get("/logout", (req, res) => {
  //setting expire to 0 from data makes cookie expire
  //second parameter - clear value with empty strings
  //we need name of cookie which should still be token
  // (first parameter)
  res
    .cookie("token", "", {
      httpOnly: true,
      //some past date
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
