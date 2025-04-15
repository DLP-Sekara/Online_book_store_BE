import express from "express";
import multer from "multer";
import BookController from "../controllers/bookController";

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
route.get("/all", BookController?.getAllBook);
route.get("/view", BookController?.fetchBook);
route.post("/create", BookController?.saveBook); //auth,role
route.put("/update", BookController?.updateBook); //auth,role
route.delete("/delete", BookController?.deleteBook); //auth,role

export default route;
