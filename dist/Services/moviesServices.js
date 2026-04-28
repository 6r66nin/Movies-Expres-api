import { AppError } from "../Classes/AppError.js";
import { queryExecutor, queryPagExecutor } from "../Utils/queryExecutor.js";
const getGenres = async (genres) => {
    const genresResult = await queryExecutor("SELECT id FROM genres WHERE name ILIKE ANY($1)", [genres]);
    if (genresResult.length === 0) {
        throw new AppError("Any movie genre is valid", 400);
    }
    return genresResult;
};
const addGenres = async (genresId, movieId) => {
    const values = genresId.map((_e, index) => `($1, $${index + 2})`).join(", ");
    await queryExecutor(`INSERT INTO movie_genres (movie_id, genre_id)  VALUES ${values} ON CONFLICT (movie_id, genre_id) DO NOTHING`, [movieId, ...genresId]);
};
const getMovieWithGenres = async (movie, id) => {
    const movieGenres = await queryExecutor("SELECT g.id, g.name FROM genres g INNER JOIN movie_genres mg ON mg.genre_id = g.id WHERE mg.movie_id = $1", [id]);
    return {
        ...movie,
        genres: movieGenres.map((g) => g.name),
    };
};
const getMovieWithGenresById = async (id) => {
    const movie = await getDatabaseMovie(id);
    return getMovieWithGenres(movie, id);
};
const getDatabaseMovie = async (id) => {
    const movie = await queryExecutor("SELECT * FROM movies WHERE id = $1", [id], true);
    if (!movie) {
        throw new AppError("Movie not found", 404);
    }
    return movie;
};
// Routes Services
///////////////////////////////////////////////////////
export const getMovies = async (page = 1) => {
    const query = "SELECT * FROM movies LIMIT $1 OFFSET $2";
    const result = queryPagExecutor(page, 10, query);
    return result;
};
export const FilterMovies = async (filter, page = 1) => {
    const genresId = (await getGenres(filter)).map((g) => g.id);
    const query = "SELECT DISTINCT m.* FROM movies m JOIN movie_genres mg ON mg.movie_id = m.id WHERE mg.genre_id = ANY($1) LIMIT $2 OFFSET $3";
    const filteredDatabaseMovies = await queryPagExecutor(page, 10, query, [genresId]);
    const movies = [];
    for (const e of filteredDatabaseMovies) {
        movies.push(await getMovieWithGenres(e, e.id));
    }
    return movies;
};
export const getMovie = async (id) => {
    return await getMovieWithGenresById(id);
};
export const addMovie = async (newMovie) => {
    const { tittle, year, director, rating, sinopsis, genres } = newMovie;
    await queryExecutor("BEGIN");
    const genresId = (await getGenres(genres)).map((g) => g.id);
    const movie = await queryExecutor("INSERT INTO movies (tittle, year, director, rating, sinopsis) VALUES ($1,$2,$3,$4,$5) RETURNING *", [tittle, year, director, rating, sinopsis], true);
    addGenres(genresId, movie.id);
    await queryExecutor("COMMIT");
    return await getMovieWithGenres(movie, movie.id);
};
export const updateMovie = async (partialMovie, id) => {
    const { genres, ...movieValues } = partialMovie;
    const values = Object.values(movieValues);
    const keys = Object.keys(movieValues);
    if (keys.length === 0) {
        throw new AppError("Invalid movie data", 400);
    }
    const keysline = keys.map((e, index) => `${e}=$${index + 2}`).join(",");
    await queryExecutor("BEGIN");
    const movie = await queryExecutor(`Update movies SET ${keysline} WHERE id = $1 RETURNING *`, [id, ...values], true);
    if (genres) {
        const genresId = (await getGenres(partialMovie.genres)).map((g) => g.id);
        await addGenres(genresId, id);
    }
    await queryExecutor("COMMIT");
    return await getMovieWithGenres(movie, id);
};
export const deleteMovie = async (id) => {
    const deleteMovie = await getMovieWithGenresById(id);
    await queryExecutor("DELETE FROM movies WHERE id = $1", [id], true);
    return deleteMovie;
};
