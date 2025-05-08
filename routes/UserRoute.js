const express = require("express");
const { body } = require("express-validator");
const { signup, signin } = require("../controllers/UserController");
const UserModel = require("../model/UserModel");

const userRouter = express.Router();

// email exist
const emailExist = (value, { req }) => {
  // if()
  return UserModel.findOne({ email: value }).then((userDoc) => {
    if (userDoc) {
      return Promise.reject("email already taken");
    }
  });
};

userRouter.post(
  "/",
  [
    body("name").trim().not().isEmpty().withMessage("name required"),

    body("email").not().isEmpty().custom(emailExist),

    body("password").trim().isLength({ min: 5 }).not().isEmpty(),
  ],
  signup
);

userRouter.post(
  "/",
  [
    body("email").not().isEmpty().custom(emailExist),

    body("password").trim().isLength({ min: 5 }).not().isEmpty(),
  ],
  signin
);
module.exports = userRouter;
