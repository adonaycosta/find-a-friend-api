import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeletePetService } from "@/services/factories/pets/make-delete-service.js";

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParams = z.object({
    id: z.uuid(),
  });

  const { id } = deletePetParams.parse(request.params);

  const deletePetService = makeDeletePetService();

  await deletePetService.execute({
    id,
  });

  return reply.status(204).send();
}
