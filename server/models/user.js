const mongoose = require("mongoose");

// define the User model schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  contact: {
    city: String,
    Country: String,
    phoneNumber: Number
  },
  links: {
    linkedIn: String,
    github: String
  },
  comment: String,
  photo: String
});

module.exports = mongoose.model("Users", UserSchema);
