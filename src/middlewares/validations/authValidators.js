const { check } = require("express-validator");
const User = require("../../models/User");

const regValidator = [
    check("name").notEmpty().withMessage("Name is required.").trim(),
    check("email")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject("E-mail already in use");
            }
        })
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Email is not valid.")
        .trim(),
    check("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6, max: 12 })
        .withMessage(
            "Please give at least min 6 characters and at least max 12 characters"
        )
        .trim(),
];

const logValidator = [
    check("email").isEmail().withMessage("Email is required.").trim(),
    check("password").notEmpty().withMessage("Password is required.").trim(),
];

module.exports = {
    regValidator,
    logValidator,
};
