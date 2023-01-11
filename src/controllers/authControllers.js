const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, role } = req.body;
        const hash = await bcrypt.hash(password, 10);
        User.create({ name, email, password: hash, role });
        res.status(201).json({
            msg: "You have created an account successfully.",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    try {
        if (!user) {
            return res.status(400).json({
                msg: "User not found",
            });
        } else {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );
            if (isPasswordMatch) {
                // access token generate
                const accessToken = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.ACCESS_TOKEN,
                    {
                        expiresIn: "10m",
                    }
                );

                // refresh token generate
                const refreshToken = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.REFRESH_TOKEN,
                    {
                        expiresIn: "30d",
                    }
                );

                // refresh token pass to cookie
                res.cookie("refreshToken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                });

                return res.status(200).json({
                    msg: "You have successfully logged in",
                    accessToken,
                });
            } else {
                return res.status(401).json({
                    msg: "Email or password is incorrect",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken: token } = req.cookies;
        const verifyToken = await jwt.verify(token, process.env.REFRESH_TOKEN);

        // access token generate
        const accessToken = jwt.sign(
            {
                _id: verifyToken._id,
                email: verifyToken.email,
                role: verifyToken.role,
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "10m",
            }
        );

        // refresh token generate
        const refreshToken = jwt.sign(
            {
                _id: verifyToken._id,
                email: verifyToken.email,
                role: verifyToken.role,
            },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: "30d",
            }
        );

        // refresh token pass to cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        res.status(404).json({
            msg: "Refresh token is invalid",
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
};
