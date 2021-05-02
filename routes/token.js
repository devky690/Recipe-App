const router = require("express").Router();
const auth = require("../middleware/auth");

//this is a protected route that returns decrypted token which is
//the object id

//since the front end cant access the token via js
//since http only cookie...need to store userId here
//userId isnt validating security because we still
//have that secret key and jwt verify
router.get("/", auth, async (req, res) => {
  try {
    res.json(res.user);
  } catch (err) {
    //could have used send() instead of json() which json()
    //returns json object and send is just for a simple string or nothing
    res.status(401).json({ errorMessage: "You are not authenticated!" });
  }
});

module.exports = router;
