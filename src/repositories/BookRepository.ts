import Book from "../models/book.model";
import { bookIdInterface, BookModel } from "../utils/interfaces/bookInterface";

const BookRepository = {
  getAllBookRepo: async (data: any): Promise<any> => {
    try {
      const { page, perPage, sort, bookName } = data;

      let query: any = {};
      if (bookName) {
        query.bookName = { $regex: bookName, $options: "i" };
      }

      let sortCriteria = {};
      if (sort == 1) {
        sortCriteria = { updatedAt: -1 };
      } else if (sort == 2) {
        sortCriteria = { updatedAt: 1 };
      } else {
        sortCriteria = { updatedAt: -1 };
      }

      const skip = (page - 1) * perPage;

      const allBooks = await Book.find(query)
        .sort(sortCriteria)
        .skip(skip)
        .limit(perPage)
        .lean();

      if (!allBooks) {
        return {
          success: true,
          message: "No Books To Fetch!",
          data: [],
        };
      }

      const processLeadTags = async (allBooks: any) =>
        Promise.all(
          allBooks.map(async (book: any) => ({
            bookId: book?._id,
            title: book?.title,
            description: book?.description,
            author: book?.author,
            ISBN_number: book?.ISBN_number,
            price: book?.price,
            type: book?.type,
            cover_image: book?.cover_image,
            status: book?.status,
            publisher: book?.publisher,
            pub_year: book?.pub_year,
            qty: book?.qty,
          }))
        );

      const processedLeadTags = await processLeadTags(allBooks);
      const totalCount = await Book.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
      return {
        success: true,
        message: "Books Fetched Successfully!",
        data: {
          page,
          totalPages,
          totalCount,
          books: processedLeadTags,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  saveBookRepo: async (data: any): Promise<any> => {
    try {
      const existBook = await Book.findOne({
        title: {
          $regex: new RegExp("^" + data.title + "$", "i"),
        },
      }).select("title");

      if (existBook) {
        return {
          success: false,
          message: "Book Already Exists!",
          data: null,
        };
      }

      const book = new Book(data);
      await book.save();
      return {
        success: true,
        message: "Book Added Successfully!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  updateBookRepo: async (data: BookModel): Promise<any> => {
    try {
      const existBook = await Book.findOne({
        _id: { $ne: data?._id },
        title: {
          $regex: new RegExp("^" + data?.title + "$", "i"),
        },
      });

      if (existBook) {
        return {
          success: false,
          message: "Book Already Exists!",
          data: null,
        };
      }
      const updatedBook = await Book.findOneAndUpdate({ _id: data?._id }, data);
      if (!updatedBook) {
        return {
          success: false,
          message: "Tag Not Found Or Could Not Be Updated!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Book Updated Successfully!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  fetchBookRepo: async (data: bookIdInterface): Promise<any> => {
    try {
      const book = await Book.findOne({ _id: data?._id }).lean();
      if (!book) {
        return {
          success: false,
          message: "Can Not Fetch Book Data!",
          data: null,
        };
      }
      const finalData = {
        bookId: book?._id,
        title: book?.title,
        description: book?.description,
        author: book?.author,
        ISBN_number: book?.ISBN_number,
        price: book?.price,
        type: book?.type,
        cover_image: book?.cover_image,
        status: book?.status,
        publisher: book?.publisher,
        pub_year: book?.pub_year,
        qty: book?.qty,
      };
      return {
        success: true,
        message: "Book Fetched Successfully!",
        data: finalData,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  deleteBookRepo: async (data: bookIdInterface): Promise<any> => {
    try {
      const book = await Book.findOne({ _id: data?._id }).lean();
      if (!book) {
        return {
          success: false,
          message: "Can Not Fetch Book Data!",
          data: null,
        };
      }
      await Book.findByIdAndDelete({ _id: data?._id });
      return {
        success: true,
        message: "Book Deleted Successfully!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default BookRepository;
