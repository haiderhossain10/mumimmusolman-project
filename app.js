const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./src/config/db");
const apiNotFound = require("./src/middlewares/404");
const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(cookieParser());

// db
db();

// api routes
app.use("/api", authRoutes);
app.use("/api", blogRoutes);
app.use("/api", categoryRoutes);
app.use("/api/upload", express.static("upload"));

// 404 page
app.use(apiNotFound);

// listening port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("This port listening on " + port));
