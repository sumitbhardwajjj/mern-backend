const express = require("express");

const userController = require('../controller/users')

const routers = express.Router();

routers
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUser)
  .put("/:id", userController.replaceUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

exports.routers = routers;
