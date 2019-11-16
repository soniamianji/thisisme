const express = require("express");
const router = new express.Router();
const Cards = require("mongoose").model("Card");

router.get("/", (req, res) => {
  //search by name AND occupation
  if (req.query.name && req.query.occupation) {
    const name = req.query.name;
    const occupation = req.query.occupation;
    var regexName = new RegExp(name.toLowerCase(), "i");
    var regexOccupation = new RegExp(occupation.toLowerCase(), "i");

    // get card info end return them
    Cards.find(
      { name: { $regex: regexName }, occupation: { $regex: regexOccupation } },
      (error, result) => {
        if (error) {
          return res.status(400).json("No users with such info");
        } else {
          console.log(result);
          return res.status(200).json(result);
        }
      }
    );
    //search by only name
  } else if (req.query.name) {
    const name = req.query.name;
    var regexName = new RegExp(name.toLowerCase(), "i");
    // get card info end return them
    Cards.find({ name: { $regex: regexName } }, (error, result) => {
      if (error) {
        return res.status(400).json("No users with such info");
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
    //search by occupation
  } else if (req.query.occupation) {
    const occupation = req.query.occupation;
    var regexOccupation = new RegExp(occupation.toLowerCase(), "i");

    // get card info end return them
    Cards.find({ occupation: { $regex: regexOccupation } }, (error, result) => {
      if (error) {
        return res.status(400).json("No users with such info");
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    });
  }
});

module.exports = router;
