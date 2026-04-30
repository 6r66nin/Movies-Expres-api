import type { Request, Response, NextFunction } from "express";
import {
  createMovieSchema,
  partialCreateMovieSchema,
} from "../Schemas/movieSchema.js";
import { AppError } from "../Classes/AppError.js";

export const validateMovie = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.body) {
    throw new AppError("Invalid movie", 400);
  }

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
