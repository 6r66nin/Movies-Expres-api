import z from "zod";
import { movieSchema,dataBaseMovieSchema, createMovieSchema,partialCreateMovieSchema } from "../Schemas/movieSchema.js";

export type movie = z.infer<typeof movieSchema>;
export type createMovie = z.infer<typeof createMovieSchema>;
export type partialMovie = z.infer<typeof partialCreateMovieSchema>;
export type dataBaseMovie = z.infer<typeof dataBaseMovieSchema>;
