const {
  createBook,
  retrieveBook,
  retrieveBookById,
  updateBook,
  deleteBook,
  createAuthor,
  retrieveAuthors,
} = require("../controllers/Bookcontroller");
const express = require("express");

// book router
const MainRouter = express.Router();

// routes
MainRouter.post("/books", createBook);
MainRouter.get("/books", retrieveBook);
MainRouter.get("/books/:id", retrieveBookById);
MainRouter.put("/books/:id", updateBook);
MainRouter.delete("/books/:id", deleteBook);
// author routes
MainRouter.post("/author", createAuthor);
MainRouter.get("/author", retrieveAuthors);

// export
module.exports = MainRouter;
