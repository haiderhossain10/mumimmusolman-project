const express = require("express");
const {
    blogCreate,
    blogList,
    blogDelete,
    blogSingle,
    blogUpdate,
} = require("../controllers/blogControllers");
const blogValidator = require("../middlewares/validations/blogValidator");
const jwtVerify = require("../middlewares/jwtVerify");
const multer = require("multer");
const blogRoutes = express.Router();

// file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "./../../upload/");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

blogRoutes.post(
    "/blog",
    jwtVerify,
    upload.single("img"),
    blogValidator,
    blogCreate
);
blogRoutes.get("/blogs", blogList);
blogRoutes.get("/blog/:slug", blogSingle);
blogRoutes.delete("/blog/:id", blogDelete);
blogRoutes.patch("/blog/:id", blogUpdate);

module.exports = blogRoutes;
