import { AppError } from "../Classes/AppError.js";
export const errorParser = (error) => {
    if (!error.code) {
        return new AppError("Internal Error", 500);
    }
    switch (error.code) {
        case "23505":
            return new AppError("Movie already exists", 500);
        case "23503":
            return new AppError("Reference genre does not exist", 500);
        case "23502":
            return new AppError("Required fields are missing", 500);
        default:
            return new AppError("Unknwon Error", 500);
    }
};
