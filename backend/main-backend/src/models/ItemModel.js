const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_id: String,
  item_name: String,
  item_description: String,
  item_ingridients: String,
  item_category: String,
  item_type: String,
  item_price: Number,
  item_image: String,
  category_id: String,
  restaurant_id: String,
});

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
