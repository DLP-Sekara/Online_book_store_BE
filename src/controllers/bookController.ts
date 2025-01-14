/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/interfaces/commonInterface";
import BookService from "../services/bookService";

const BookController = {
  getAllBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { page, perPage, sort, bookName }: any = req.query;
    try {
      const parsedPage = parseInt(page, 10) || 1;
      const parsedPerPage = parseInt(perPage, 10) || 10;
      const parsedSort = parseInt(sort) || 1;
      const response: ApiResponse<any[]> = await BookService?.getAllBookService(
        {
          page: parsedPage,
          perPage: parsedPerPage,
          sort: parsedSort,
          bookName,
        }
      );
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  saveBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const {
        title,
        description,
        author,
        ISBN_number,
        price,
        type,
        cover_image,
        status,
        publisher,
        pub_year,
        qty,
      } = req?.body;

      if (!title) {
        return res.status(200).json({
          success: false,
          message: "Book Name Required!",
          data: null,
        });
      }
      const response: ApiResponse<any[]> = await BookService?.saveBookService({
        title: title.trim(),
        description: description,
        author: author,
        ISBN_number: ISBN_number,
        price: price,
        type: type,
        cover_image: cover_image,
        status: status,
        publisher: publisher,
        pub_year: pub_year,
        qty: qty,
      });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const {
        bookId,
        title,
        description,
        author,
        ISBN_number,
        price,
        type,
        cover_image,
        status,
        publisher,
        pub_year,
        qty,
      } = req?.body;

      if (!title || !bookId) {
        return res.status(200).json({
          success: false,
          message: "Book ID & Book Name Required!",
          data: null,
        });
      }
      const response: ApiResponse<any[]> = await BookService?.updateBookService(
        {
          _id: bookId,
          title: title.trim(),
          description: description,
          author: author,
          ISBN_number: ISBN_number,
          price: price,
          type: type,
          cover_image: cover_image,
          status: status,
          publisher: publisher,
          pub_year: pub_year,
          qty: qty,
        }
      );
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  fetchBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { bookId }: any = req?.query;

      if (!bookId) {
        return res.status(200).json({
          success: false,
          message: "Book ID Required!",
          data: null,
        });
      }
      const response: ApiResponse<any[]> = await BookService?.fetchBookService({
        _id: bookId,
      });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { bookId }: any = req?.query;

      if (!bookId) {
        return res.status(200).json({
          success: false,
          message: "Book ID Required!",
          data: null,
        });
      }
      const response: ApiResponse<any[]> = await BookService?.deleteBookService(
        {
          _id: bookId,
        }
      );
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default BookController;
