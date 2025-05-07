const UserModel = require("../model/UserModel");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "validation failed", error: error.array() });
    }

    const { name, email, password } = req.body;
    const savedUser = await UserModel.create({ name, email, password });

    res
      .status(200)
      .json({ message: "user created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

// const signup = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "" });
//   }
// };

// const signup = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "" });
//   }
// };

// const signup = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "" });
//   }
// };

module.exports = { signup };
