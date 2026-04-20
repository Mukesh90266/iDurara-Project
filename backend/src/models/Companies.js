const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Peoples",
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Companies", companiesSchema)