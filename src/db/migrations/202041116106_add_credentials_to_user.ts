import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here
  return pool.query(`
    ALTER TABLE "user"
      ADD COLUMN password TEXT NOT NULL default '',
      ADD COLUMN "resetToken" TEXT,
      ADD COLUMN "resetTokenExpiry" TEXT;
  `);
};
