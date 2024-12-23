import Book from "../models/book.model";
import { BookModel } from "../utils/interface";

export const getAllBookService = async (): Promise<object | string> => {
  try {
    const book = await Book.find();
    return book;
  } catch (error) {
    return "error :" + error;
  }
};

export const saveBookService = async (
  data: any,
  bookImage: any
): Promise<object | string> => {
  try {
    const highestBid = await Book.findOne()
      .sort("-book_id")
      .select("book_id")
      .lean();
    const newBid: any = highestBid ? highestBid?.book_id + 1 : 1;

    const book = new Book({
      bid: newBid,
      book_name: data.book_name,
      book_author: data.book_author,
      book_qty: data.book_qty,
      book_price: data.book_price,
      book_type: data.book_type,
      book_image: bookImage,
    });

    const saveResponse = await book.save();
    return { message: "Book added successfully !", saveResponse };
  } catch (error) {
    console.log(error);
    return "error :" + error;
  }
};

export const updateBookService = async (
  data: BookModel
): Promise<object | string> => {
  try {
    const { _id, ...updateData } = data;
    const updateResponse = await Book.findOneAndUpdate({ _id }, updateData);
    return { message: "Book Update successfuly !", updateResponse };
  } catch (error) {
    return "error :" + error;
  }
};

export const searchBookService = async (
  data: string
): Promise<object | string> => {
  try {
    const searchedBook = await Book.find({ book_name: data });
    return searchedBook;
  } catch (error) {
    return "error :" + error;
  }
};

export const fetchBookService = async (
  data: string
): Promise<object | string> => {
  try {
    const fetchedBook = await Book.find({ bid: data });
    return fetchedBook;
  } catch (error) {
    return "error :" + error;
  }
};

export const deleteBookService = async (
  data: string
): Promise<object | string> => {
  try {
    const deleteResponse = await Book.findByIdAndDelete(data);
    return { message: "Book Deleted successfuly !", deleteResponse };
  } catch (error) {
    return "error :" + error;
  }
};
