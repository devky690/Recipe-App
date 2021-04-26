//better to validate with Joi...much better
//than mongoose validation
const mongoose = require("mongoose");

//need to add more properties to the model

//ref wont populate immediately
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  //dont need user_id here since category will have user_id
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ingredients: [{ type: String }],
  image: { type: String },
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
