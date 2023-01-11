const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timeseries: true }
);

module.exports = mongoose.model("Category", CategorySchema);
