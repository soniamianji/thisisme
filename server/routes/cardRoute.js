const express = require("express");
const router = new express.Router();
const Cards = require("mongoose").model("Card");
const validator = require("validator");

// validate request
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

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
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
      email: req.body.email.trim(),

      contact: {
        city: req.body.contact.city.trim(),
        country: req.body.contact.country.trim(),
        phoneNumber: req.body.contact.phoneNumber.trim()
      },
      links: {
        linkedIn: req.body.linkedIn,
        github: req.body.github
      },
      comment: req.body.comment
    };
    const newUser = new Cards(userData);
    newUser.save(err => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json();
      }
    });
  }
});

// delete userCard
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Cards.findById(id, (error, card) => {
    if (error) {
      return res.status(400).end();
    } else {
      // delete user
      Cards.deleteOne(card, error => {
        if (error) {
          return res.status(500).json("server error.");
        } else res.status(204).json("Card Successfully deleted.");
      });
    }
  });
});

// get UserCard
router.get("/:id", (req, res) => {
  const id = req.params.id;

  // get card info end return them
  Cards.findById(id, (error, card) => {
    if (error) {
      return res.status(400).json("No user with such id")
    } else {
      return res.status(200).json(card) 
    }
  });

})
