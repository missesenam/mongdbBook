const {
  createAuthor,
  retrieveAuthors,
} = require("../controllers/AuthorController");
const express = require("express");

// book router
const AuthorRouter = express.Router();

// routes
AuthorRouter.post("/", createAuthor);
AuthorRouter.get("/", retrieveAuthors);

// export
module.exports = AuthorRouter;
