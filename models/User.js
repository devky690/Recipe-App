const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  passwordHash: {
    type: String,
    required: true,
  },
});

//mongoose schema (validates, formats documents) connects to mongoose model (connects
//to documents) which connects
//to collection in db, to reference documents in collection

//User schema relates to users collection in db,
//name User = users, requirement
module.exports = mongoose.model("User", userSchema);
