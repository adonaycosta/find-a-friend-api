import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env/index.js";

export const schema = new URL(env.DATABASE_URL).searchParams.get("schema") || "public";

const adapter = new PrismaPg(
  {
    connectionString: env.DATABASE_URL,
  },
  {
    schema,
  },
);

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
  adapter,
});
