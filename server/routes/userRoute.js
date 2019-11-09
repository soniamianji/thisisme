const express = require("express");
const router = new express.Router();
const Users = require("mongoose").model("Users");
const validator = require("validator");

function validateUserCard(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !payload ||
    typeof payload.name !== "string" ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (
    !payload ||
    typeof payload.lastName !== "string" ||
    payload.lastName.trim().length === 0
  ) {
    isFormValid = false;
    errors.lastName = "Please provide your last name.";
  }

  if (
    !payload ||
    typeof payload.occupation !== "string" ||
    payload.occupation.trim().length === 0
  ) {
    isFormValid = false;
    errors.occupation = "Please provide your occupation.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

//create usercard
router.post("/", (req, res) => {
  const validationResult = validateUserCard(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
    const userData = {
      name: req.body.name.trim(),
      lastName: req.body.lastName.trim(),
      occupation: req.body.occupation.trim(),
      contact: {
        city: req.body.contact.city.trim(),
        country: req.body.contact.country.trim()
      },
      links: {
        linkedIn: req.body.linkedIn,
        github: req.body.github
      },
      comment: req.body.comment
    };
    const newUser = new Users(userData);
    newUser.save(err => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(200).json();
      }
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ msg: "working" });
});
module.exports = router;
