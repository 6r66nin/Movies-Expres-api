import pool from "../Config/pool.js";
export const queryExecutor = async (query, params = [], oneItem = false) => {
    try {
        const result = await pool.query(query, params);
        const rows = result.rows;
        return (oneItem ? rows[0] : rows);
    }
    catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
};
export const queryPagExecutor = async (pag, limit, query, params = []) => {
    try {
        const offset = (pag - 1) * limit;
        params.push(limit, offset);
        console.log(params);
        const result = await pool.query(query, params);
        return result.rows;
    }
    catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
};
