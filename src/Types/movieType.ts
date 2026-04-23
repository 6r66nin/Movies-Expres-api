import type z from "zod";
import { movieDbSchema, createMovieSchema } from "../Schemas/movieSchema.js";

export type movie = z.infer<typeof createMovieSchema>;
export type movieDB = z.infer<typeof movieDbSchema>;
