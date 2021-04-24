const jwt = require("jsonwebtoken");

//this is our authentication middleware

function auth(req, res, next) {
  try {
    //cookie contain jwt token
    const token = req.cookies.token;

    //if you dont have a token you havent been logged in...you cant continue
    if (!token) return res.status(401).json({ errorMessage: "unauthorized" });

    //jwt sees if token was created with the JWT_SECRET encryption key
    //if token wasnt created with jwt_secret...function throws
    //an error then we will jump to catch block to catch
    //error...
    //if successful -> payload in token will be decoded...so basically
    //we will get an object id...because thats what we sent as the payload originally
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //verified.user...user is the object id...this originated from
    //the payload
    res.user = verified.user;
    console.log(res.user);

    next();
  } catch (err) {
    console.log(err);
    //not just .send() because we want to send an error message
    res.status(401).json({ errorMessage: "unauthorized" });
  }
}

module.exports = auth;
