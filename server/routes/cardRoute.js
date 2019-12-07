const express = require("express");
const router = new express.Router();
const Cards = require("mongoose").model("Card");
const validator = require("validator");


//validate the url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

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
    typeof payload.occupation !== "string"
  ) {
    isFormValid = false;
    errors.occupation = "Please provide a valid occupation.";
  }

  if (
    !payload ||
    typeof payload.city !== "string"
  ) {
    isFormValid = false;
    errors.city = "Please enter a valid city.";
  }

  if (
    !payload ||
    typeof payload.country !== "string"
  ) {
    isFormValid = false;
    errors.country = "Please enter a valid country.";
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
  console.log(req.body);
  Cards.findOneAndUpdate({ _id: cardId }, req.body, err => {
    if (err) {
      return res.status(400).json({ errors: "id not found." });
    } else {
      return res.status(204).json({ success: "updated" });
    }
  });

});

module.exports = router;
