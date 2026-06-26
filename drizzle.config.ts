import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  // We don't throw here to allow the build to proceed in environments where the URL is provided at runtime
  console.warn("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString || "",
  },
});
