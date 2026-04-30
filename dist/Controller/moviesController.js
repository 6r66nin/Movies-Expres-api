import * as Services from "../Services/moviesServices.js";
import { paginationSchema } from "../Schemas/paginationSchema.js";
import { AppError } from "../Classes/AppError.js";
export const getMovies = async (req, res) => {
    const { page, filter } = paginationSchema.parse(req.query);
    const movies = !filter
        ? Services.getMovies(page)
        : Services.FilterMovies(Array.isArray(filter) ? filter : [filter], page);
    res.json(await movies);
};
export const addMovie = async (req, res) => {
    const movie = req.body;
    res.json(await Services.addMovie(movie));
};
export const getMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await Services.getMovie(id);
    if (!movie) {
        throw new AppError("Movie not found", 400);
    }
    res.json(movie);
};
export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const partialMovie = req.body;
    const updatedMovie = await Services.updateMovie(partialMovie, id);
    res.json(updatedMovie);
};
export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    res.json(await Services.deleteMovie(id));
};
