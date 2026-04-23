import { z } from "zod";
export const movieDbSchema = z.object({
    id: z.uuid(),
    tittle: z.string().min(1).max(255),
    year: z.number().int().min(1999).max(2027),
    director: z.string().min(1).optional(),
    create_at: z.date(),
    rating: z.number().min(0).max(10),
    sipnosis: z.string().min(1).max(255).optional()
});
export const createMovieSchema = movieDbSchema.omit({
    id: true,
    create_at: true,
});
