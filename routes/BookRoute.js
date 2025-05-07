const {
  createBook,
  retrieveBook,
  retrieveBookById,
  updateBook,
  deleteBook,
} = require("../controllers/Bookcontroller");
const express = require("express");

// book router
const MainRouter = express.Router();

// routes
MainRouter.post("/", createBook);
MainRouter.get("/", retrieveBook);
MainRouter.get("/:id", retrieveBookById);
MainRouter.put("/:id", updateBook);
MainRouter.delete("/:id", deleteBook);

// export
module.exports = MainRouter;
