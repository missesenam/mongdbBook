const AuthorModel = require("../model/AuthorModel");
const mongoose = require("mongoose");

const createAuthor = async (req, res) => {
  try {
    const { name, email, country, bookId } = req.body;
    if (!name || !email || !country || !bookId) {
      return res.status(400).json({ message: "all field are req" });
    }
    const newAuthor = AuthorModel({
      name,
      email,
      country,
      bookId,
    });
    const savedAuthor = await newAuthor.save();
    res
      .status(200)
      .json({ message: "author successfully created", author: savedAuthor });
  } catch (err) {
    res.status(500).json(err);
  }
};

const retrieveAuthors = async (req, res) => {
  try {
    const foundauthors = await AuthorModel.find().populate(
      "bookId",
      "title -_id"
    );
    if (foundauthors.length === 0) {
      return res.status(404).json({ message: "no authors available" });
    }
    res.status(200).json(foundauthors);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createAuthor, retrieveAuthors };
