import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetPetAdoptionContactService } from "@/services/factories/pets/make-adoption-interest-service.js";

export async function adoption(request: FastifyRequest, reply: FastifyReply) {
  const findPetParamsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = findPetParamsSchema.parse(request.params);

  const getPetAdoptionContactService = makeGetPetAdoptionContactService();

  const { whatsAppLink } = await getPetAdoptionContactService.execute({
    id,
  });

  return reply.status(200).send({
    whatsAppLink,
  });
}
