import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const authorsRoutes = express.Router();

authorsRoutes.get("/authors", AuthorController.ListAuthors, pagination);
authorsRoutes.get("/authors/:id", AuthorController.ListAuthorById);
authorsRoutes.post("/authors", AuthorController.AddAuthor);
authorsRoutes.put("/authors/:id", AuthorController.UpdateAuthor);
authorsRoutes.delete("/authors/:id", AuthorController.DeleteAuthor);

export default authorsRoutes;