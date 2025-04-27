import express from "express";
import multer from "multer";
import BookController from "../controllers/bookController";

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

// Setup multer middleware for file uploads
const bookUpload = upload.fields([
  { name: "cover_images", maxCount: 5 },
  { name: "pdf_file", maxCount: 1 },
]);

const route = express.Router();
route.get("/all", BookController?.getAllBook);
route.get("/view", BookController?.fetchBook);
route.post("/create", bookUpload, BookController?.saveBook); //auth,role
route.put("/update", bookUpload, BookController?.updateBook); //auth,role
route.delete("/delete", BookController?.deleteBook); //auth,role

export default route;
