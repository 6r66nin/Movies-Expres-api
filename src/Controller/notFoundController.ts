import type { Request, Response } from "express";

export const urlNotFound = (req: Request, res: Response) => {
  res.status(404).send("The requested URL was not found");
};
