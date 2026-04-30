import { z } from "zod";
export const movieSchema = z.object({
    id: z.uuid("Invalid ID"),
    title: z.string().min(1, "Movie's title should not be empty").max(255, "Title so long max(255)"),
    year: z.number("Year must be a number").int().min(1999, "Invalid Year").max(2027, "Invalid Year").transform(e => Math.floor(e)),
    director: z.string().min(1, "The director's name should not be left blank").optional(),
    create_at: z.date(),
    rating: z.number("The rating must be a number").min(0).max(10),
    sinopsis: z.string().min(1).max(255).optional(),
    genres: z.array(z.string()).transform(arr => arr.map(e => e.toLowerCase())),
});
export const dataBaseMovieSchema = movieSchema.omit({
    genres: true
});
export const createMovieSchema = movieSchema.omit({
    id: true,
    create_at: true,
});
export const partialCreateMovieSchema = createMovieSchema.partial();
