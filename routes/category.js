//categories will be a protected route

const router = require("express").Router();
const Category = require("../models/Category");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
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

//get a single category
router.get("/:category_id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id);
    console.log("found");
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//gets all categories
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
