import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const database = "postgresql://two-docs-database_owner:1LevUnKksyp4@ep-weathered-frost-a2ws2y49.eu-central-1.aws.neon.tech/two-docs-database?sslmode=require"
const sql = neon(database);
export const db = drizzle(sql);