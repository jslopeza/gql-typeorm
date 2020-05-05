import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here

  return pool.query(`CREATE TABLE "user" (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
  )`);
};
