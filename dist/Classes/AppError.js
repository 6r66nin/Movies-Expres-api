export class AppError extends Error {
    statusCode;
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
    }
}
