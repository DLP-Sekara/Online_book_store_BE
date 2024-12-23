import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN_number: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  cover_image: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  pub_year: {
    type: Number,
  },
  qty: {
    type: Number,
    required: true,
  },
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
