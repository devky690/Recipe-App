//categories will be a protected/guard route

const router = require("express").Router();
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const { update } = require("../models/Category");

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
    const { title, ingredients } = req.body;
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
      ingredients,
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
    const recipes = await Recipe.find({ category_id: req.params.category_id });
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
router.get("/:category_id/recipe/:recipe_id", auth, async (req, res) => {
  try {
    //find returns an array...so good for finding multiple documents
    //but for one use findById or findOne or else would
    //need to at index at 0 if using find
    const category = await Category.findById(req.params.category_id);
    const recipe = await Recipe.findById(req.params.recipe_id);
    console.log(category);
    const user_id = res.user;
    if (category.user_id != user_id) {
      console.log(category.user_id || "yo");
      console.log(category);
      console.log(user_id);
      res
        .status(401)
        .json({ errorMessage: "this is not your category! unauthorized" });
    }
    if (recipe.category_id != req.params.category_id) {
      res.status(404).json({
        errorMessage: "this recipe is not inside this category",
      });
    }
    res.json(recipe);
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
    //.send could be for simple message or no message
    //.json is for a whole object
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

router.patch("/:category_id", auth, async (req, res) => {
  const { title } = req.body;

  try {
    const category = await Category.findById(req.params.category_id);
    if (title != null) {
      category.title = title;
    }
    console.log(category);
    //using save for FULL validation and middleware
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: err.message });
  }
});

router.patch("/:category_id/recipe/:recipe_id", auth, async (req, res) => {
  const { title, ingredients } = req.body;
  //category only holds recipe id and not the full recipe, so no need to update category
  try {
    const recipe = await Recipe.findById(req.params.recipe_id);
    if (title != null) {
      recipe.title = title;
    }
    if (ingredients != null) {
      recipe.ingredients = ingredients;
    }
    console.log(recipe);
    //using save for FULL validation and middleware
    const updatedRecipe = await recipe.save();
    //for client to access
    res.json(updatedRecipe);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: err.message });
  }
});

router.delete("/:category_id", auth, async (req, res) => {
  try {
    const { category_id } = req.params;
    await Category.findByIdAndDelete({ _id: category_id });
    //so recipes are removed that no longer have a category
    await Recipe.deleteMany({ category_id: category_id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.status(404).send("Not found");
  }
});
router.delete("/:category_id/recipe/:recipe_id", auth, async (req, res) => {
  try {
    const { recipe_id } = req.params;
    await Recipe.findByIdAndDelete({ _id: recipe_id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
