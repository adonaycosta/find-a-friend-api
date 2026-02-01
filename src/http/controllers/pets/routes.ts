import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { create } from "./create.js";
import { deletePet } from "./delete.js";
import { find } from "./find.js";
import { search } from "./search.js";
import { update } from "./update.js";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create);
  app.delete("/pets/:id", { onRequest: [verifyJwt] }, deletePet);

  app.get("/pets", search);
  app.get("/pets/:id", find);
  app.patch("/pets/:id", update);
}
