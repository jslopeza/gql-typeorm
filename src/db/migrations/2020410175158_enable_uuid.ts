import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here
  return pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
};
