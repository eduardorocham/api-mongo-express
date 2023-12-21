import { author } from "../models/index.js";
import  { book } from "../models/index.js";
import DontFound from "../errors/DontFound.js";

class BookController {
    static async ListBooks (req, res, next) {
        try {
            const searchBooks = book.find();

            req.result = searchBooks;

            next();
            // let { limit = 5, page = 1, fieldOrder = "_id", order = -1 } = req.query;

            // limit = parseInt(limit);
            // page = parseInt(page);

            // if (limit > 0 & page > 0) {
            //     const booksList = await book.find({})
            //         .sort({ [fieldOrder]: order })
            //         .skip((page - 1) * limit)
            //         .limit(limit);
            //     return res.status(200).json({
            //         page: page,
            //         count: booksList.length,
            //         result: booksList
            //     });
            // } else {
            //     next(new IncorrectRequest());
            // }
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

    static async ListBooksByFilter (req, res, next) {
        const { publishing, title, minPages, maxPages, authorName } = req.query;

        // const regex = new RegExp(title, "i");

        const search = {};

        if (publishing) search.publishing = publishing;
        if (title) search.title = { $regex: title, $options: "i" };
        if (minPages && !maxPages) search.pages = { $gte: minPages };
        if (maxPages && !minPages) search.pages = { $lte: maxPages };
        if (minPages && maxPages) search.pages = {
            $gte: minPages,
            $lte: maxPages
        };

        if (authorName) {
            const foundAuthor = await author.findOne({ name: { $regex: authorName, $options: "i" } });

            if (foundAuthor !== null) {
                search.author = foundAuthor;
            } else {
                res.status(200).json([]);
            }
        }

        try {
            const booksByFilter = book.find(search);

            req.result = booksByFilter;
            next();
            // res.status(200).json(booksByFilter);
        } catch(error) {
            next(error);
        }
    }
}

export default BookController;