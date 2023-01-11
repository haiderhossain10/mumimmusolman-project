const express = require("express");
const {
    register,
    login,
    refreshToken,
} = require("../controllers/authControllers");
const {
    regValidator,
    logValidator,
} = require("../middlewares/validations/authValidators");
const authRoutes = express.Router();

authRoutes.post("/register", regValidator, register);
authRoutes.post("/login", logValidator, login);
authRoutes.post("/refresh-token", refreshToken);

module.exports = authRoutes;
