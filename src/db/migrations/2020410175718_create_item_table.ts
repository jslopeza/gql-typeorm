import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here

  return pool.query(`CREATE TABLE "item" (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image text,
    "largeImage" text,
    price int NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW(),
    "updatedAt" timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
  )`);
  // user_id uuid NOT NULL,
  // FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
};
