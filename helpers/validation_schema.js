//better to validate with Joi...much better
//than mongoose validation
const Joi = require("@hapi/joi");

//need to add more properties to the model
//can add more schemas here
//no need for model
const recipeSchema = new Joi.object({
  title: Joi.string().required(),
  ingredients: Joi.string().array().required(),
});

module.exports = { recipeSchema };
