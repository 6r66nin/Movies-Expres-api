import type { Request, Response, NextFunction } from "express";
import { idSchema } from "../Schemas/idSchema.js";

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;

  idSchema.parse(id);

  next();
};
