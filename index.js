// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MainRouter = require("./routes/BookRoute");
const AuthorRouter = require("./routes/AuthorRoute");
const userRouter = require("./routes/UserRoute");

const port = 5000;

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
  .connect(
    "mongodb+srv://esidjograce:L5NgOUFcSOtmgjt9@cluster0.xm0uqvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((resu) => {
    server.listen(port, () =>
      console.log(`the server up and ready on port: ${port}`)
    );
  })
  .catch((err) => console.log(err));
