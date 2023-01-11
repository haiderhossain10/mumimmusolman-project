const { validationResult } = require("express-validator");
const slugGenerate = require("slug");
const unidecode = require("unidecode");
const Blog = require("../models/Blog");

// create blog
const blogCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, author, body, category, status } = req.body;
        const slug = slugGenerate(unidecode(title), "-");
        Blog.create({
            title,
            author,
            body,
            img: req.file.filename,
            category,
            slug,
            status,
        });
        res.status(201).json({ msg: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// all blogs
const blogList = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .populate("author", "-password")
            .skip(skip)
            .limit(limit);

        const length = await Blog.countDocuments();
        res.status(200).json({ blogs, length });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// single blog
const blogSingle = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate("author", "-password")
            .populate("category");
        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// update blog
const blogUpdate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, author, body, img, category, status } = req.body;
        Blog.findOneAndUpdate(
            { id: req.params.id },
            { title, author, body, img, category, status }
        );
        res.status(200).json({
            msg: "Blog updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

// delete blog
const blogDelete = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (deletedBlog) {
            res.status(200).json({
                message: "Blog deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "Blog not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

module.exports = { blogCreate, blogList, blogSingle, blogUpdate, blogDelete };
