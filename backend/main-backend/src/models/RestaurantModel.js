const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurant_id: String,
  email: String,
  password: String,
  name: String,
  description: String,
  phone_number: String,
  open_time: Date,
  close_time: Date,
  restaurant_image: String,
  location: {
    addressType: String,
    addressLine1: String,
    addressLine2: String,
    country: String,
    state: String,
    city: String,
    zipCode: String,
  },
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;
