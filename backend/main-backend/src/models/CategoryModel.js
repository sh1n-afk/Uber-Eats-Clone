const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_id: String,
    category_name: String,
    restaurant_id: String
});

const categoryModel = mongoose.model("category", categorySchema, "categories");
module.exports = categoryModel;
