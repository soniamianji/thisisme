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
  city: String,
  country: String,
  phoneNumber: String,
  links: {
    linkedin: String,
    github: String,
    facebook: String,
    instagram: String,
    portfolioSite: String,
    behance: String,
    twitter: String,
    youtube: String
  },

  comment: String,
  img: String,
  last_modified: Date,
  fontFamily: {
    type: String,
    default: "Karla"
  },
  color: {
    type: String,
    default: "#3949ab"
  }

});
CardSchema.index({ name: "text", occupation: "text", city: "text", country: "text" });
module.exports = mongoose.model("Card", CardSchema);
