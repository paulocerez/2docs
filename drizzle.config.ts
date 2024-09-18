import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/*",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://2docs-db_owner:XCeJshBnuV83@ep-billowing-scene-a2mggovy.eu-central-1.aws.neon.tech/2docs-db?sslmode=require"
  },
});
