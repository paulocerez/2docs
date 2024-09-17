import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const database = "postgresql://2docs-db_owner:RV1Mwnb4WuBx@ep-calm-union-a2vcgd5l.eu-central-1.aws.neon.tech/2docs-db?sslmode=require"
const sql = neon(database);
export const db = drizzle(sql);