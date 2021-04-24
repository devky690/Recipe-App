//categories will be a protected/guard route

const router = require("express").Router();
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    //res.user comes from auth middleware which was ulimately in our jwt
    //signature
    user_id = res.user;
    const newCategory = new Category({
      title,
      user_id,
    });

    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//add recipe to category
router.post("/:category_id/recipe", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const category = await Category.findById(req.params.category_id);
    const user_id = res.user;

    category_id = category._id;

    if (category.user_id != user_id) {
      res
        .status(401)
        .json({ errorMessage: "this is not your category! unauthorized" });
    }
    //title and category_id must match model fields!
    const newRecipe = new Recipe({
      title,
      category_id,
    });

    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//get all recipes under a category...
router.get("/:category_id/recipe", auth, async (req, res) => {
  try {
    //using findById when not querying for mongo id directly but through url
    //usually
    const category = await Category.findById(req.params.category_id);
    const user_id = res.user;

    if (category.user_id != user_id) {
      res
        .status(401)
        .json({ errorMessage: "this is not your category! unauthorized" });
    }
    //url category id doesnt match category id for recipe...this would be for a single
    //recipe
    // if (recipe.category_id != req.params.category_id) {
    //   res.status(404).json({
    //     errMessage: "this recipe is not inside this category",
    //   });
    // }
    const recipes = await Recipe.find({ category_id: req.params.category_id });
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//get a single category...may not need this route
router.get("/:category_id", auth, async (req, res) => {
  try {
    const user_id = res.user;
    //params is from actual url
    const category = await Category.findById(req.params.category_id);
    //token = object id...doesnt match mongo id in db
    if (category.user_id != user_id) {
      res
        .status(400)
        .json({ errorMessage: "this is not your category! unauthorized" });
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//gets all categories for a specific user
router.get("/", auth, async (req, res) => {
  try {
    //this will allow us to get individual user's id
    //what we are querying for versus (:) what we are querying against
    const categories = await Category.find({ user_id: res.user });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
