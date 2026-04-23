import type { Request, Response, NextFunction } from "express";
import { createMovieSchema } from "../Schemas/movieSchema.js";

export const validateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  
  req.body = createMovieSchema.parse(req.body);

  next();
};
