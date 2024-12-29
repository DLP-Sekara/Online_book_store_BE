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

export const saveBookService = async (data: any): Promise<object | string> => {
  try {
    const highestBid = await Book.findOne()
      .sort("-book_id") // Use descending order
      .select("book_id")
      .lean();
    const newBid = highestBid ? Number(highestBid?.book_id) + 1 : 1;

    const book = new Book({
      book_id: newBid,
      title: data.title,
      description: data.description,
      author: data.author,
      ISBN_number: data.ISBN_number,
      price: data.price,
      type: data.type,
      cover_image: data.cover_image,
      status: data.status,
      publisher: data.publisher,
      pub_year: data.pub_year,
      qty: data.qty,
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
    const searchedBook = await Book.find({ title: data });
    return searchedBook;
  } catch (error) {
    return "error :" + error;
  }
};

export const fetchBookService = async (
  data: string
): Promise<object | string> => {
  try {
    const fetchedBook = await Book.find({ book_id: data });
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
