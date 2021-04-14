const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

//schema provides a way to "talk" to model in our database
module.exports = mongoose.model("User", userSchema);
