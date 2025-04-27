import Book from "../models/book.model";
import {
  BookDetails,
  bookIdInterface,
  BookModel,
  saveBook,
} from "../utils/interfaces/bookInterface";

const BookRepository = {
  getAllBookRepo: async (data: BookDetails): Promise<any> => {
    try {
      const { page, perPage, sort, bookName, ISBN_number }: any = data;
      let query: any = {};
      if (bookName) {
        query.title = { $regex: bookName, $options: "i" };
      }
      if (ISBN_number) {
        query.ISBN_number = ISBN_number;
      }

      let sortCriteria: any = {};
      switch (sort) {
        case 1:
          sortCriteria = { updatedAt: -1 }; // Descending order
          break;
        case 2:
          sortCriteria = { updatedAt: 1 }; // Ascending order
          break;
        default:
          sortCriteria = { updatedAt: -1 }; // Default to descending
          break;
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

      const processBooks = async (allBooks: any) =>
        Promise.all(
          allBooks.map(async (book: any) => ({
            bookId: book?._id,
            title: book?.title,
            description: book?.description,
            author: book?.author,
            ISBN_number: book?.ISBN_number,
            price: book?.price,
            status: book?.status,
            qty: book?.qty,
            types: book?.types,
            cover_images: book?.cover_images,
            pdf_file: book?.pdf_file,
            publisher: book?.publisher,
            pub_year: book?.pub_year,
            isAwarded: book?.isAwarded,
            rating: book?.rating,
            number_of_pages: book?.number_of_pages,
            format: book?.format,
            reviews: book?.reviews,
            createdAt: book?.createdAt,
            updatedAt: book?.updatedAt,
          }))
        );

      const processedBooks = await processBooks(allBooks);
      const totalCount = await Book.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
      return {
        success: true,
        message: "Books Fetched Successfully!",
        data: {
          page,
          totalPages,
          totalCount,
          books: processedBooks,
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

  saveBookRepo: async (data: saveBook): Promise<any> => {
    try {
      const existBookByTitle = await Book.findOne({
        title: {
          $regex: new RegExp("^" + data.title + "$", "i"),
        },
      }).select("title");

      const existBookByISBN = await Book.findOne({
        ISBN_number: data.ISBN_number,
      }).select("ISBN_number");

      if (existBookByTitle) {
        return {
          success: false,
          message: "Book with this title already exists!",
          data: null,
        };
      }

      if (existBookByISBN) {
        return {
          success: false,
          message: "Book with this ISBN number already exists!",
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

  updateBookRepo: async (data: saveBook): Promise<any> => {
    try {
      const existBookByTitle = await Book.findOne({
        title: {
          $regex: new RegExp("^" + data.title + "$", "i"),
        },
      }).select("title");

      const existBookByISBN = await Book.findOne({
        ISBN_number: data.ISBN_number,
      }).select("ISBN_number");

      if (existBookByTitle) {
        return {
          success: false,
          message: "Book with this title already exists!",
          data: null,
        };
      }

      if (existBookByISBN) {
        return {
          success: false,
          message: "Book with this ISBN number already exists!",
          data: null,
        };
      }
      const updatedBook = await Book.findOneAndUpdate({ _id: data?._id }, data);
      if (!updatedBook) {
        return {
          success: false,
          message: "Book Not Found Or Could Not Be Updated!",
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
      const typedBook = book as saveBook;

      const finalData = {
        bookId: typedBook._id,
        title: typedBook.title,
        description: typedBook.description,
        author: typedBook.author,
        ISBN_number: typedBook.ISBN_number,
        price: typedBook.price,
        status: typedBook.status,
        qty: typedBook.qty,
        types: typedBook.types,
        cover_images: typedBook.cover_images,
        pdf_file: typedBook.pdf_file,
        publisher: typedBook.publisher,
        pub_year: typedBook.pub_year,
        isAwarded: typedBook.isAwarded,
        rating: typedBook.rating,
        number_of_pages: typedBook.number_of_pages,
        format: typedBook.format,
        reviews: typedBook.reviews,
        createdAt: typedBook.createdAt,
        updatedAt: typedBook.updatedAt,
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
