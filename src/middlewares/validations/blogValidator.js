const { body, check } = require("express-validator");
const Blog = require("../../models/Blog");
const unidecode = require("unidecode");
const slugGenerate = require("slug");

const blogValidator = [
    check("title")
        .custom(async (title) => {
            const slug = slugGenerate(unidecode(title));
            const blog = await Blog.findOne({ slug });
            if (blog) {
                return Promise.reject("Blog with this slug already exists.");
            }
        })
        .notEmpty()
        .withMessage("Title is required.")
        .trim(),
    check("author").notEmpty().withMessage("Author is required.").trim(),
    check("category").notEmpty().withMessage("Category is required.").trim(),
    check("status").notEmpty().withMessage("Status is required.").trim(),
    check("body").notEmpty().withMessage("Content is required.").trim(),
];

module.exports = blogValidator;
