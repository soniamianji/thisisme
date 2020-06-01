const express = require("express");
const router = new express.Router();
const { google } = require("googleapis");
const secretTokenKey = "a secret phrase";
const jwt = require("jsonwebtoken");
const Card = require("mongoose").model("Card");

router.get("/", (req, res) => {
  res.status(200).end();
});

router.post("/", (req, res) => {
  const code = req.body.code;
  console.log(req.body);
  const oauth2Client = new google.auth.OAuth2(
    "706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com",
    "AxlzAqm4JekmtgkDGBTxvpax",
    "postmessage"
  );
  google.options({ auth: oauth2Client });

  oauth2Client
    .getToken(code)
    .then(res => {
      const tokens = res.tokens;
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2" });
      return oauth2.userinfo.get();
    })
    .then(userData => {
      const googleid = userData.data.id;
      //check if user has already logged in with their googleAccount
      Card.findOne({ googleId: googleid }, (err, user) => {
        //if user not found create new
        if (!user) {
          const userInfo = {
            name: userData.data.name.toLowerCase(),
            email: userData.data.email,
            googleId: userData.data.id,
            img: userData.data.picture,
          };
          const newUserCard = new Card(userInfo);
          newUserCard.save(err => {
            if (err) {
              res.status(500).json(err);
            } else {
              Card.findOne({ email: userData.data.email }, (err, newUser) => {
                if (err) {
                } else {
                  const access_token = jwt.sign(
                    { id: newUser.id },
                    secretTokenKey
                  );
                  const id_token = jwt.sign(
                    {
                      id: newUser.id,
                      email: newUser.email,
                      name: newUser.name,
                      isNewUser: true
                    },
                    secretTokenKey
                  );
                  res.status(201).json({
                    message: "Auth Success. user created",
                    id_token: id_token,
                    access_token: access_token
                  });
                }
              })

            }
          });
        } else if (user) {
          const access_token = jwt.sign({ id: user.id }, secretTokenKey);
          user.isNewUser = false;
          user.save(err => { return res.status(500).end() })
          const id_token = jwt.sign(
            {
              email: user.email,
              name: user.name,
              id: user.id,
              isNewUser: false
            },
            secretTokenKey
          );
          res.status(200).json({
            message: "Auth Success.",
            id_token: id_token,
            access_token: access_token
          });
        } else if (err) {
          res.status(500).end();
        } else {
          res.status(400).end("something is wrong");
        }
      });
    });
});

module.exports = router;
