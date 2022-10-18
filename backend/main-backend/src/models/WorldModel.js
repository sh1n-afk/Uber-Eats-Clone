const mongoose = require("mongoose");

const worldSchema = new mongoose.Schema({
  country_id: String,
  name: String,
  states: [
    {
      state_id: String,
      name: String,
      cities: [{ city_id: String, name: String }],
    },
  ],
});

const worldModel = mongoose.model("world", worldSchema, "world");
module.exports = worldModel;
