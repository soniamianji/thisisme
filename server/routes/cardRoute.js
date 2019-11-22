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
      return res.status(400).json("No user with such id");
    } else {
      return res.status(200).json(card);
    }
  });
});

//update userCard
router.put("/:id", (req, res) => {
  const cardId = req.params.id;
  const validationResult = validateUserCard(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
    Cards.findOneAndUpdate({ _id: cardId }, req.body, err => {
      if (err) {
        return res.status(400).json({ errors: "id not found." });
      } else {
        return res.status(204).json({ success: "updated" });
      }
    });
  }
});

module.exports = router;
