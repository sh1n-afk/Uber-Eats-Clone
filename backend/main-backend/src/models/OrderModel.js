const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: String,
  restaurant_id: String,
  customer_id: String,
  order_mode: String,
  order_status: String,
  created: Date,
  items: [
    {
      itemId: String,
      itemPrice: Number,
      restaurantId: String,
      qty: Number,
      specialInstruction: String,
    },
  ],
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
