const apiNotFound = (req, res) => {
    res.status(404).json({
        msg: "404 api not found.",
    });
};

module.exports = apiNotFound;
