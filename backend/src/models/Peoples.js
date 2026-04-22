const mongoose = require("mongoose");

const peoplesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    ref: "companiese",
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique:true
  },
});

module.exports = mongoose.model("Peoples", peoplesSchema)
