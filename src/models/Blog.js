const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
    {
        title: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        body: String,
        img: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        slug: String,
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", BlogSchema);
