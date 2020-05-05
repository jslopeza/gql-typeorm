import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here
  return pool.query(`
    CREATE TABLE "permission" (
      id uuid NOT NULL unique default gen_random_uuid(),
      role varchar(255) NOT NULL,
      PRIMARY KEY (id)
    );

    INSERT INTO "permission" (role) values ('ADMIN');
    INSERT INTO "permission" (role) values ('USER');
    INSERT INTO "permission" (role) values ('ITEMCREATE');
    INSERT INTO "permission" (role) values ('ITEMUPDATE');
    INSERT INTO "permission" (role) values ('PERMISSIONUPDATE');
  `);
};
