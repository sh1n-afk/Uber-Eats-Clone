const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: String,
  email: String,
  password: String,
  name: String,
  nickname: String,
  phone_number: String,
  date_of_birth: Date,
  customer_image: String,
  addresses: {
    type: [
      {
        addressType: String,
        addressLine1: String,
        addressLine2: String,
        country: String,
        state: String,
        city: String,
        zipCode: String,
      },
    ],
    default: [],
  },
  favourites: { type: [String], default: [] },
});

const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;
