const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  contact: Number,
  password: String,
  picture: String,
  orders: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
});

module.exports = mongoose.model("user", userSchema);
