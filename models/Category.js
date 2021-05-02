const mongoose = require("mongoose");

//ref wont populate immediately

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  //no array here since not referring to category name but just
  //id itself
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //dont need this we can just inside recipe collection with model....query for a recipe id and query against the category id in the parameter seen in the url
  //to display all the recipes
  //recipes_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
