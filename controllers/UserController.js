const UserModel = require("../model/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "validation failed", error: error.array() });
    }

    const { name, email, password } = req.body;

    const hashedpassword = await bcrypt.hash(password, 7);

    const savedUser = await UserModel.create({
      name,
      email,
      password: hashedpassword,
    });
    res.status(201).json({
      message: "user created successfully",
      user: { name: savedUser.name, email: savedUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating user", error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "validation failed", error: error.array() });
    }

    //  find user
    const finduser = await UserModel.findOne();
    // compare password
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

module.exports = { signup, signin };
