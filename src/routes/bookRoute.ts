import express from "express";
import {
  deleteBook,
  fetchBook,
  getAllBook,
  saveBook,
  searchBook,
  updateBook,
} from "../controllers/bookController";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "D:/IJSE/Work area/__PROJECTS__/book_store_cw/book_catalog_ui/public/uploads"
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const route = express.Router();
route.get("/", getAllBook);
route.get("/:title", searchBook);
route.get("/details/:bid", fetchBook);
// route.post('/',upload.single('book_image'), saveBook);
route.post("/", saveBook);
route.put("/", updateBook);
route.delete("/delete/:id", deleteBook);

export default route;
