import { z } from "zod";

export const genreDbSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255)
});