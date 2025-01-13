import Book from "../models/book.model";
import BookRepository from "../repositories/BookRepository";
import {
  BookDetails,
  bookIdInterface,
  BookModel,
} from "../utils/interfaces/bookInterface";
import { ApiResponse } from "../utils/interfaces/commonInterface";

const BookService = {
  getAllBookService: async (data: BookDetails): Promise<ApiResponse<any[]>> => {
    try {
      // const books = await BookRepository.getAllBookRepo(data);
      // return {
      //   success: true,
      //   message: "Books retrieved successfully",
      //   data: books,
      // };
      return BookRepository.getAllBookRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  saveBookService: async (data: BookModel): Promise<ApiResponse<any[]>> => {
    try {
      // const response = await BookRepository.saveBookRepo(data);
      // return {
      //   success: true,
      //   message: "Book added successfully",
      //   data: response,
      // };
      return await BookRepository.saveBookRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  updateBookService: async (data: BookModel): Promise<ApiResponse<any[]>> => {
    try {
      // const response = await BookRepository.updateBookRepo(data);
      // return {
      //   success: true,
      //   message: "Book updated successfully",
      //   data: response,
      // };
      return await BookRepository.updateBookRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  fetchBookService: async (
    data: bookIdInterface
  ): Promise<ApiResponse<any[]>> => {
    try {
      // const response = await BookRepository.fetchBookRepo(data);
      // return {
      //   success: true,
      //   message: "Book fetched successfully",
      //   data: response,
      // };
      return await BookRepository.fetchBookRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  deleteBookService: async (
    data: bookIdInterface
  ): Promise<ApiResponse<any[]>> => {
    try {
      // const response = await BookRepository.deleteBookRepo(data);
      // return {
      //   success: true,
      //   message: "Book deleted successfully",
      //   data: response,
      // };
      return await BookRepository.deleteBookRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};
export default BookService;
