const express = require("express");
const categoryValidator = require("../middlewares/validations/categoryValidator");
const {
    categoryCreate,
    categoriesList,
    categoryUpdate,
    categoryDelete,
} = require("../controllers/categoryControllers");

const categoryRoutes = express.Router();

categoryRoutes.post("/category", categoryValidator, categoryCreate);
categoryRoutes.get("/categories", categoriesList);
categoryRoutes.patch("/category/:id", categoryUpdate);
categoryRoutes.delete("/category/:id", categoryDelete);

module.exports = categoryRoutes;
