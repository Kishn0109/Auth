const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../key");
const reuirelogin = require("../middle/rl");

router.post("/Registration", (req, res) => {
  const { name, email, password, mobile_number, Url } = req.body;
  if (!email || !email || !password || !mobile_number) {
    res.json({ message: "error got please fill this " });
  }
  user
    .findOne({ email: email })
    .then((data) => {
      if (data) {
        return res.status(422).json({ error: "already exist" });
      }
      bcrypt
        .hash(password, 12)
        .then((hashpassword) => {
          const userdb = new user({
            email: req.body.email,
            name: name,
            password: hashpassword,
            mobile_number: mobile_number,
            picture: Url,
          });
          userdb
            .save()
            .then((user) => {
              res.json({ message: "saved" });
              console.log("save succesful");
              console.log(user.picture);
            })
            .catch((error) => {
              res.json({ message: "error got bro " });
              console.log("not succesful");
            });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

router.post("/signIn", (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "please fill the email and password" });
  }
  user.findOne({ email: email }).then((saveUser) => {
    if (!saveUser) {
      return res.status(422).json({ message: "invailed eamil password " });
    }
    bcrypt
      .compare(password, saveUser.password)
      .then((domatch) => {
        if (domatch) {
          const token = jwt.sign({ _id: saveUser._id }, JWT_KEY);
          res.json(token);
          res.json(saveUser);
        } else {
          return res.json({ error: "invailed eamil password " });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

router.get("/userdata", reuirelogin, (req, res) => {
  user
    .findOne({ email: req.User.email })
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
router.put("/updatatedata", reuirelogin, (req, res) => {
  const id = req.User._id;
  console.log(id);
  user
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      console.log(data);
      if (!data) {
        console.log("data not found");
      } else {
        console.log(" user update succesfully ");
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
