import fs from "fs";

(() => {
  const dt = new Date();

  const timestamp = `${dt.getFullYear()}${
    dt.getMonth() + 1
  }${dt.getDate()}${dt.getHours()}${dt.getMinutes()}${dt.getSeconds()}`;

  if (!process.argv[2]) {
    throw Error("Enter name for the migration");
  }
  fs.writeFileSync(
    `${__dirname}/migrations/${timestamp}_${process.argv[2]}.ts`,
    `import { Pool } from "pg";

export default (pool: Pool): Promise<any> => {
  // Add query here
};`
  );
})();
