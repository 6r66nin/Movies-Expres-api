import type { Request, Response } from "express";
import * as Services from "../Services/moviesServices.js";
import { paginationSchema } from "../Schemas/paginationSchema.js";

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const { page, filter } = paginationSchema.parse(req.query);

  const movies = !filter
    ? Services.getMovies(page)
    : Services.FilterMovies(Array.isArray(filter) ? filter : [filter], page);

  res.json(await movies);
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = req.body;

  res.json(await Services.addMovie(movie));
};

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const movie = await Services.getMovie(String(id));

  res.json(movie);
};

export const updateMovie = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const partialMovie = req.body;

  const updatedMovie = await Services.updateMovie(partialMovie, String(id));

  res.json(updatedMovie);
};
