import mongoose, { Schema } from "mongoose";
const bookSchema = new mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
    },
    pub_year: {
      type: String,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
const Book = mongoose.model("Book", bookSchema);
export default Book;
