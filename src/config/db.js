const mongoose = require("mongoose");

const db = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected.");
    } catch (error) {
        console.log("Error connection :", error);
    }
};

module.exports = db;
