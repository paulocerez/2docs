import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { neon, Pool } from "@neondatabase/serverless";

// const isProduction = process.env.NODE_ENV === "production";
const database = "postgresql://2docs-db_owner:XCeJshBnuV83@ep-billowing-scene-a2mggovy.eu-central-1.aws.neon.tech/2docs-db?sslmode=require"

// if (isProduction) {
const sql = neon(database);
export const db = drizzle(sql);
// } else {
//   const pool = new Pool({
//     connectionString: database,
//   });
//   db = drizzleNode(pool);
// }
