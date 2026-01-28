import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import z, { ZodError } from "zod";
import { env } from "./env/index.js";
import { orgsRoutes } from "./http/controllers/orgs/routes.js";
import { petsRoutes } from "./http/controllers/pets/routes.js";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== "production") {
    return console.error(error);
  }

  return reply.status(500).send({
    message: "Internal server error.",
  });
});
