const mongoose = require("mongoose");

// define the User model schema
const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: { unique: true }
  },
  googleId: {
    type: Number,
    index: { unique: true }
  },
  occupation: {
    type: String,
    required: true
  },
  contact: {
    city: String,
    country: String,
    phoneNumber: Number
  },
  links: {
    linkedIn: String,
    github: String
  },
  comment: String,
  photo: String
});

module.exports = mongoose.model("Card", CardSchema);
