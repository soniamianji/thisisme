const express = require("express");
const router = new express.Router();
const Cards = require("mongoose").model("Card");

router.get("/", (req, res) => {
  const searchWords = req.query.name;
  Cards.find({ $text: { $search: searchWords.toLowerCase() } })
    .exec((err, cards) => {
      if (cards) return res.status(200).json(cards)
      if (err) return res.status(400).json(err)
    })
});

module.exports = router;
