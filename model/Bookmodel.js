const mongoose = require("mongoose");

// schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  authors: [
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true,
      },
    },
  ],
});

// connect to model
const BookModel = mongoose.model("booksread", BookSchema);

// export
module.exports = BookModel;
