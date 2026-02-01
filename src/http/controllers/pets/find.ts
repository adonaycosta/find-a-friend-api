import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindPetService } from "@/services/factories/pets/make-find-service.js";

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findPetParamsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = findPetParamsSchema.parse(request.params);

  const findPetService = makeFindPetService();

  const { pet } = await findPetService.execute({
    id,
  });

  return reply.status(200).send({
    pet,
  });
}
