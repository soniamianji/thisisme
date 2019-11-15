const mongoose = require("mongoose");

// define the User model schema
const CardSchema = new mongoose.Schema({
  name: {
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
    type: String
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
  img: String,
  userStyle: {
    last_modified: Date,
    fontFamily: {
      type: String,
      default: "Open sans"
    },
    color: {
      type: String,
      default: "#3949ab"
    }
  }
});

module.exports = mongoose.model("Card", CardSchema);
