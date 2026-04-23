import type { Request, Response, NextFunction } from "express";
import { idSchema } from "../Schemas/idSchema.js";

export const validateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  idSchema.parse(req.params.id);

  next();
};
