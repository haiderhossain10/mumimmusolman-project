const { validationResult } = require("express-validator");
const Category = require("../models/Category");

// create category
const categoryCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        Category.create(req.body);
        return res.status(201).json({ message: "Category created" });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// all categories
const categoriesList = async (req, res) => {
    try {
        const categories = await Category.find().populate(
            "author",
            "-password"
        );
        return res.status(200).json({ categories: categories });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// update category
const categoryUpdate = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }

        return res.status(200).json({ category: category });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// delete category
const categoryDelete = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        return res.status(200).json({ msg: "Category deleted" });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

module.exports = {
    categoryCreate,
    categoriesList,
    categoryUpdate,
    categoryDelete,
};
