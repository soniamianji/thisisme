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
      console.log("res");
      const tokens = res.tokens;
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2" });
      return oauth2.userinfo.get();
    })
    .then(userData => {
      console.log(userData.data);
      const googleid = userData.data.id;
      //check if user has already logged in with their googleAccount
      Card.findOne({ googleId: googleid }, (err, user) => {
        //if user not found create new
        if (!user) {
          console.log("not found");
          const userInfo = {
            name: userData.data.name,
            email: userData.data.email,
            occupation: "",
            googleId: userData.data.id,
            contact: {
              city: "",
              country: "",
              phoneNumber: ""
            },
            links: {
              linkedIn: "",
              github: ""
            },
            comment: "",
            img: userData.data.picture,
            userStyle: {
              last_modified: Math.round(new Date().getTime() / 1000)
            }
          };
          const newUserCard = new Card(userInfo);
          console.log(newUserCard);

          newUserCard.save(err => {
            if (err) {
              res.status(500).json(err);
            } else {
              const access_token = jwt.sign(
                { googleId: googleid },
                secretTokenKey
              );
              const id_token = jwt.sign(
                {
                  email: userData.data.email,
                  name: userData.data.name,
                  img: userData.data.picture,
                  id: userData.data.id,
                  userStyle: newUserCard.userStyle
                },
                secretTokenKey
              );
              res.status(201).json({
                message: "Auth Success. user created",
                id_token: id_token,
                access_token: access_token
              });
            }
          });
        } else if (user) {
          console.log(user.id);
          console.log(user);
          const access_token = jwt.sign({ id: user.id }, secretTokenKey);
          const id_token = jwt.sign(
            {
              email: user.email,
              name: user.name,
              img: user.img,
              id: user.id,
              userStyle: user.userStyle
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
