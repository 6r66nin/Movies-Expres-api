import z from "zod";
import { genreDbSchema } from "../Schemas/genreSchema.js";

export type genre = z.infer<typeof genreDbSchema>;
