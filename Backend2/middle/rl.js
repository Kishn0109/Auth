const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../key");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Ben ", "");

  jwt.verify(token, JWT_KEY, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "error to verify " });
    }
    const { _id } = payload;
    user.findById(_id).then((userdata) => {
      req.User = userdata;
      console.log(userdata);
      next();
    });
  });
};
