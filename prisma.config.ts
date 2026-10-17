import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, generate).
// Use the DIRECT (non-pooled) Neon connection string here.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"),
  },
});