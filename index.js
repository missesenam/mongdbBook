// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MainRouter = require("./routes/BookRoute");
const AuthorRouter = require("./routes/AuthorRoute");
const userRouter = require("./routes/UserRoute");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

// server
const server = express();

// body parser middleware
server.use(bodyParser.json());

// Router
server.use("/api/books", MainRouter);
server.use("/api/authors", AuthorRouter);
server.use("/api/users", userRouter);

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((resu) => {
    server.listen(PORT, () =>
      console.log(`the server up and ready on port: ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
