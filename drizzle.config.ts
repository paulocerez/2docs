import { defineConfig } from "drizzle-kit";

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
}

export default defineConfig({
  schema: "./db/schema/*",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
});

