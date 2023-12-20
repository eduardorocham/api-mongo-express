import express from "express";
import BookController from "../controllers/bookController.js";

const booksRoutes = express.Router();

booksRoutes.get("/books", BookController.ListBooks);
booksRoutes.get("/books/search", BookController.ListBooksByPublishing);
booksRoutes.get("/books/:id", BookController.ListBookById);
booksRoutes.post("/books", BookController.AddBook);
booksRoutes.put("/books/:id", BookController.UpdateBook);
booksRoutes.delete("/books/:id", BookController.DeleteBook);

export default booksRoutes;