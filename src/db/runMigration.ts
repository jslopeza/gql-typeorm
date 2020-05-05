import fs from "fs";
import { Pool } from "pg";

const pool = new Pool();

export default async () => {
  // Create the migrations table if not created already
  await pool.query(`CREATE TABLE IF NOT EXISTS "migration" (
    id SERIAL,
    filename varchar(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );`);

  const migrationPath = `${__dirname}/migrations`;

  let dir = await fs.promises.readdir(migrationPath, {
    encoding: "utf8",
  });

  dir = dir.filter((i) => !i.endsWith(".map"));

  for (let i = 0; i < dir.length; i++) {
    const migrationName = dir[i];
    const alreadyMigrated = await pool.query(
      `SELECT * FROM "migration" WHERE filename = $1`,
      [migrationName]
    );

    if (alreadyMigrated.rowCount === 0) {
      const migraton = require(`${migrationPath}/${migrationName}`).default;
      await migraton(pool);
      await pool.query(`INSERT INTO "migration" (filename) VALUES ($1)`, [
        migrationName,
      ]);
    }
  }

  console.log("Migrations successfully run");
  pool.end();
};
