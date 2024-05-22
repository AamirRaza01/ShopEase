const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  picture: String,
  gstin: String,
  products: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model("owner", ownerSchema);
