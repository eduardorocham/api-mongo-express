import IncorrectRequest from "../errors/IncorrectRequest.js";

const pagination = async (req, res, next) => {
    try {
        let { limit = 5, page = 1, fieldOrder = "_id", order = -1 } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        const result = req.result;

        if (limit > 0 & page > 0) {
            const paginationResult = await result.find({})
                .sort({ [fieldOrder]: order })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).json({
                page: page,
                count: paginationResult.length,
                result: paginationResult
            });
        } else {
            next(new IncorrectRequest());
        }
    } catch(error) {
        next(error);
    }
};

export default pagination;