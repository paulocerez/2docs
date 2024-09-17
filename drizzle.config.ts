import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/*",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://2docs-db_owner:RV1Mwnb4WuBx@ep-calm-union-a2vcgd5l.eu-central-1.aws.neon.tech/2docs-db?sslmode=require",
  },
});
