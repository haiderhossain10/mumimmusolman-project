const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN);
            next();
        } catch (error) {
            res.status(401).json({ msg: "Invalid token" });
        }
    } else {
        res.status(400).json({
            msg: "Token not found",
        });
    }
};

module.exports = jwtVerify;
