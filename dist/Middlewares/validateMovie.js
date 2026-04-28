import { createMovieSchema, partialCreateMovieSchema } from "../Schemas/movieSchema.js";
export const validateMovie = async (req, _res, next) => {
    req.body = createMovieSchema.parse(req.body);
    next();
};
export const validatePartialMovie = async (req, _res, next) => {
    req.body = partialCreateMovieSchema.parse(req.body);
    next();
};
