import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest {
    constructor(error) {
        const errorMessage = Object.values(error.errors)
            .map(erro => erro.message)
            .join("; ");

        super(`Has ocurred the following errors: ${errorMessage}`);
    }
}

export default ValidationError;