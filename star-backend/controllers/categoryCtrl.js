const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if user have role = 1 ---> admin
      //only admin can create,delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) {
        return res.status(400).json({ msg: "This category already exists" });
      }

      const newCategory = new Category({ name });

      result = await newCategory.save();

      return res.json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categories = await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Deleted a Category" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const categories = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        { name }
      );
      res.status(200).json({ msg: "Updated a Category" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryCtrl;
