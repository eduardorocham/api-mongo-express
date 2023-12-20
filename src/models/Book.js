import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { 
        type: String, 
        required: [true, "Book title is required"],
        // Validação personalizada: 
        validate: {
            validator: (value) => {
                return value.length > 3;
            },
            message: "Number of characters must be greater than 3"
        }
    },
    publishing: { 
        type: String,
        enum: {
            values: ["Quadrante", "Ecclesiae"],
            message: "Publishing must be 'Quadrante' or 'Ecclesiae'"
        } 
    },
    price: { type: Number },
    pages: { 
        type: Number, 
        min: [10, "Min number of pages must be 10"], 
        max: [5000, "Max number of pages must be 5000"]
    },
    author: authorSchema
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;