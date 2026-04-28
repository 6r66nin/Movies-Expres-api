import { z } from "zod";
import { getGenresEnum } from "../Utils/genrestoEnum.js";

export const movieSchema = z.object({
  id: z.uuid(),
  tittle: z.string().min(1).max(255),
  year: z.number().int().min(1999).max(2027),
  director: z.string().min(1).optional(),
  create_at: z.date(),
  rating: z.number().min(0).max(10),
  sinopsis: z.string().min(1).max(255).optional(),
  genres: z.array(z.enum(await getGenresEnum()).transform(e => e.toLowerCase())),
});

export const dataBaseMovieSchema = movieSchema.omit({
  genres: true
});

export const createMovieSchema = movieSchema.omit({
  id: true,
  create_at: true,
});

export const partialCreateMovieSchema = createMovieSchema.partial();
