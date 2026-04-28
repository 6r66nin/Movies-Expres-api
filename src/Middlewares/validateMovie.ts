import type { Request, Response, NextFunction } from "express";
import { createMovieSchema, partialCreateMovieSchema } from "../Schemas/movieSchema.js";

export const validateMovie = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  
  req.body = createMovieSchema.parse(req.body);

  next();
};

export const validatePartialMovie = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  
  req.body = partialCreateMovieSchema.parse(req.body);

  next();
};
