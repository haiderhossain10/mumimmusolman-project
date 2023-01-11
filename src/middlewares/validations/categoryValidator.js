const { check } = require("express-validator");
const Category = require("../../models/Category");

const categoryValidator = [
    check("name")
        .custom(async (name) => {
            const category = await Category.findOne({ name });
            if (category) {
                return Promise.reject("Category already exists");
            }
        })
        .notEmpty()
        .withMessage("Category name is required."),
];

module.exports = categoryValidator;
