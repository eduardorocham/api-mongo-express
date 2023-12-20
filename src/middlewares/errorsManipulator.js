import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";
import DontFound from "../errors/DontFound.js";

// eslint-disable-next-line no-unused-vars
export const errorsManipulator = (error, req, res, next) => {
    console.log(error);
    
    if (error instanceof mongoose.Error.CastError) {
        new IncorrectRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else if (error instanceof DontFound) {
        error.sendResponse(res);
    } else {
        new ErrorBase().sendResponse(res);
    }
};