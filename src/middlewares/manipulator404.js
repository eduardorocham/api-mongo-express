import DontFound from "../errors/DontFound.js";

// eslint-disable-next-line no-unused-vars
const manipulator404 = (req, res, next) => {
    const error404 = new DontFound();
    next(error404);
};

export default manipulator404;