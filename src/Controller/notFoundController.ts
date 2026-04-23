import type { Request, Response } from "express";

export const urlNotFound = (req: Request, res: Response) => {
  res.status(404).send("URL NOT FOUND");
};
