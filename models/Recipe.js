const mongoose = require("mongoose");

//ref wont populate immediately
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  //dont need user_id here since category will have user_id
  categories_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
