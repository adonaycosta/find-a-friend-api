import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { adoption } from "./adoption.js";
import { create } from "./create.js";
import { deletePet } from "./delete.js";
import { find } from "./find.js";
import { search } from "./search.js";
import { update } from "./update.js";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create);
  app.delete("/pets/:id", { onRequest: [verifyJwt] }, deletePet);
  app.patch("/pets/:id", { onRequest: [verifyJwt] }, update);

  app.get("/pets", search);
  app.get("/pets/:id", find);
  app.get("/pets/:id/adoption", adoption);
}
