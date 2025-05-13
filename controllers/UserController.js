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

    const hashedpassword = await bcrypt.hash(password, 10);

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
    const { email, password } = req.body;
    //  find user. email:email but only email cause same name
    const finduser = await UserModel.findOne({ email });

    if (!finduser) {
      return res
        .status(401)
        .json({ message: "Email and password combination incorrect" });
    }
    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email and password combination incorrect" });
    }
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to sign in" });
  }
};

module.exports = { signup, signin };
