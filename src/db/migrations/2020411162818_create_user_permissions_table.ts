import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here
  return pool.query(`CREATE TABLE "user_permission" (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    permission_id uuid not null,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES "permission" (id) ON DELETE CASCADE
  );`);
};
