const BookModel = require("../model/Bookmodel");
const AuthorModel = require("../model/AuthorModel");
const mongoose = require("mongoose");

// create
const createBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;
    if (!title || !author || !price) {
      return res.status(400).json({ message: "all fields are require" });
    }
    const newBook = new BookModel({
      title,
      author,
      price,
    });
    const savedbook = await newBook.save();

    res.status(201).json({
      message: "the book was created successfully",
      book: savedbook,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not create book." });
  }
};

// retrieve
const retrieveBook = async (req, res) => {
  try {
    const foundbook = await BookModel.find();
    if (foundbook.length === 0) {
      return res.status(404).json({ message: "no books available yet" });
    }
    res.status(200).json(foundbook);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve books." });
  }
};

// retrieve by id
const retrieveBookById = async (req, res) => {
  try {
    const id = req.params.id;
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const bookfounbyid = await BookModel.findById(id);
    if (!bookfounbyid) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(bookfounbyid);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve book by ID", error: err });
  }
};

// update
const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, price } = req.body;
    // Use findByIdAndUpdate
    const updatedbook = await BookModel.findByIdAndUpdate(
      id,
      {
        title,
        author,
        price,
      },
      { new: true }
    );
    if (!updatedbook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book updated successfully",
      book: updatedbook,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await BookModel.findByIdAndDelete(id);
    const deletedAuthors = await AuthorModel.deleteMany({
      bookId: deletedBook._id,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book and related authors deleted successfully",
      deletedBook: deletedBook,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// ******* author controller
//
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
// export
module.exports = {
  createBook,
  retrieveBook,
  retrieveBookById,
  updateBook,
  deleteBook,
  createAuthor,
  retrieveAuthors,
};
