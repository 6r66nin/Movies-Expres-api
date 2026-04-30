import { AppError } from "../Classes/AppError.js";
import { queryExecutor, queryPagExecutor } from "../Utils/queryExecutor.js";
const addGenres = async (genres, movieId) => {
    const values = genres.map((_e, index) => `($1, $${index + 2})`).join(", ");
    const addedGenres = await queryExecutor(`INSERT INTO movie_genres (movie_id, genre_id)  VALUES ${values} ON CONFLICT (movie_id, genre_id) DO NOTHING RETURNING *`, [movieId, ...genres]);
    return addedGenres.map((e) => e.name);
};
// Services Routes 
///////////////////////////////////////////////////////
export const getMovies = async (page = 1) => {
    const query = "SELECT m.*, array_agg(g.name) FILTER(WHERE g.name IS NOT NULL) as genres FROM movies m LEFT JOIN movie_genres mg ON m.id=mg.movie_id LEFT JOIN genres g ON g.id=mg.genre_id GROUP BY m.id LIMIT $1 OFFSET $2";
    return queryPagExecutor(page, 10, query);
};
export const FilterMovies = async (filter, page = 1) => {
    const query = "SELECT m.*, array_agg(g.name) as genres FROM movies m JOIN movie_genres mg ON mg.movie_id = m.id JOIN genres g ON g.id = mg.genre_id WHERE m.id IN (SELECT mg2.movie_id FROM movie_genres mg2 JOIN genres g2 ON g2.id = mg2.genre_id WHERE LOWER(g2.name) = ANY($1) GROUP BY mg2.movie_id HAVING COUNT(DISTINCT LOWER(g2.name)) = array_length($1, 1)) GROUP BY m.id LIMIT $2 OFFSET $3";
    const filteredDatabaseMovies = await queryPagExecutor(page, 10, query, [filter]);
    return filteredDatabaseMovies;
};
export const getMovie = async (id) => {
    const query = "SELECT m.*, array_agg(g.name) FILTER(WHERE g.name IS NOT null) as genres FROM movies m JOIN movie_genres mg ON mg.movie_id = m.id JOIN genres g ON g.id = mg.genre_id WHERE m.id = $1 GROUP BY m.id;";
    const movie = queryExecutor(query, [id], true);
    if (!movie) {
        throw new AppError("Movie not found", 404);
    }
    return movie;
};
export const addMovie = async (newMovie) => {
    const { title, year, director, rating, sinopsis, genres } = newMovie;
    await queryExecutor("BEGIN");
    const movie = await queryExecutor("INSERT INTO movies (tittle, year, director, rating, sinopsis) VALUES ($,$,$,$,$) RETURNING *", [title, year, director, rating, sinopsis], true);
    const addedGenres = await addGenres(genres, movie.id);
    await queryExecutor("COMMIT");
    return { genres: addedGenres, ...movie };
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
    const addedGenres = genres ? await addGenres(genres, id) : [];
    await queryExecutor("COMMIT");
    const updateMovie = {
        genres: addedGenres,
        ...movie,
    };
    return updateMovie;
};
export const deleteMovie = async (id) => {
    return await queryExecutor("DELETE FROM movies WHERE id = $1 RETURNING *", [id], true);
};
