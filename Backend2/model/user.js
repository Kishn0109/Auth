const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    // required: true,
    default: "no photo",
  },
});
const user = mongoose.model("user", schema);
module.exports = user;
