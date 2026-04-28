import pool from "../Config/pool.js";

export const queryExecutor = async <T>(
  query: string,
  params: unknown[] = [],
  oneItem: boolean = false,
): Promise<T> => {
  try {
    const result = await pool.query(query, params);

    const rows = result.rows;

    return (oneItem ? rows[0] : rows) as T;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const queryPagExecutor = async <T>(
  pag: number,
  limit: number,
  query: string,
  params: unknown[] = []

): Promise<T> => {
  try {
    
    const offset = (pag - 1) * limit;
    
    params.push(limit, offset);
    
    console.log(params);
    
    const result = await pool.query(query, params);

    return result.rows as T;
     
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};
