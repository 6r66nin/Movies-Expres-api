import pool from "../Config/pool.js";
export const getGenresEnum = async () => {
    const result = await pool.query("SELECT name FROM genres");
    const genresArray = result.rows.map((element) => {
        return element.name;
    });
    return genresArray;
};
