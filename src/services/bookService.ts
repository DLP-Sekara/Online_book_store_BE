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
