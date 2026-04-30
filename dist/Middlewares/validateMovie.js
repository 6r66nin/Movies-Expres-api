import { createMovieSchema, partialCreateMovieSchema, } from "../Schemas/movieSchema.js";
import { AppError } from "../Classes/AppError.js";
export const validateMovie = async (req, _res, next) => {
    if (!req.body) {
        throw new AppError("Invalid movie", 400);
    }
    req.body = createMovieSchema.parse(req.body);
    next();
};
export const validatePartialMovie = async (req, _res, next) => {
    req.body = partialCreateMovieSchema.parse(req.body);
    next();
};
