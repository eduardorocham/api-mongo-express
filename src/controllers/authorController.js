import { author } from "../models/index.js";
import DontFound from "../errors/DontFound.js";

class AuthorController {
    static async ListAuthors (req, res, next) {
        try {
            const authorsList = author.find({});

            req.result = authorsList;

            next();
            // return res.status(200).json(authorsList);
        } catch(error) {
            next(error);
        }
    }

    static async ListAuthorById (req, res, next) {
        const id = req.params.id;

        try {
            const authorFound = await author.findById(id);
            
            if (authorFound !== null) {
                return res.status(200).json(authorFound);
            } else {
                next(new DontFound("Author don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async AddAuthor (req, res, next) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Author added with success",
                author: newAuthor
            });
        } catch(error) {
            next(error);
        }
    }

    static async UpdateAuthor (req, res, next) {
        const id = req.params.id;
        try {
            const authorToUpdate = await author.findByIdAndUpdate(id, req.body);
            if (authorToUpdate !== null) {
                return res.status(200).json({ message: "Author updated with success" });
            } else {
                next(new DontFound("Author don't found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static async DeleteAuthor (req, res, next) {
        const id = req.params.id;
        try {
            const authorToDelete = await author.findByIdAndDelete(id);
            if (authorToDelete !== null) {
                return res.status(200).json({ message: "Author deleted with success" });
            } else {
                next(new DontFound("Author don't found"));
            }
        } catch(error) {
            next(error);
        }
    }
}

export default AuthorController;