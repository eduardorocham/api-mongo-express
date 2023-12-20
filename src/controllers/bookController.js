import DontFound from "../errors/DontFound.js";
import { author } from "../models/index.js";
import  { book } from "../models/index.js";

class BookController {
    static async ListBooks (req, res, next) {
        try {
            const booksList = await book.find({});
            return res.status(200).json(booksList);
        } catch(error) {
            next(error);
        }
    }

    static async ListBookById (req, res, next) {
        const id = req.params.id;
        try {
            const bookFound = await book.findById(id);
            if (bookFound !== null) {
                return res.status(200).json(bookFound);
            } else {
                next(new DontFound("Book don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async AddBook (req, res, next) {
        const newBook = req.body;

        try {
            const authorFound = await author.findById(newBook.author);
            if (authorFound !== null) {
                const fullBook = { ...newBook, author: {...authorFound._doc } };
                const bookCreated = await book.create(fullBook);
                res.status(201).json({
                    message: "Book added with success",
                    book: bookCreated
                });
            } else {
                next(new DontFound("Author sent don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async UpdateBook (req, res, next) {
        const id = req.params.id;
        try {
            const bookToUpdate = await book.findByIdAndUpdate(id, req.body);
            if (bookToUpdate !== null) {
                return res.status(200).json({ message: "Book updated with success" });
            } else {
                next(new DontFound("Book don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async DeleteBook (req, res, next) {
        const id = req.params.id;
        try {
            const bookToDelete = await book.findByIdAndDelete(id);
            if (bookToDelete !== null) {
                return res.status(200).json({ message: "Book deleted with success" });
            } else {
                next(new DontFound("Book don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async ListBooksByPublishing (req, res, next) {
        const publishing = req.query.publishing;
        try {
            const booksByPublishing = await book.find({ publishing: publishing });
            res.status(200).json(booksByPublishing);
        } catch(error) {
            next(error);
        }
    }
}

export default BookController;