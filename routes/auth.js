const express = require("express");

const authController = require('../controller/auth')

const route = express.Router();

route
  .post("/", authController.Signup)
  .post("/login", authController.Login)

exports.route = route;
