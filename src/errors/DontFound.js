import ErrorBase from "./ErrorBase.js";

class DontFound extends ErrorBase {
    constructor(message= "Page don't found") {
        super(message, 404);
    }
}

export default DontFound;   