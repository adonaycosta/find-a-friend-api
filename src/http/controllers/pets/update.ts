import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdatePetService } from "@/services/factories/pets/make-update-service.js";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.uuid(),
  });

  const updateBodySchema = z.object({
    name: z.string().min(2).optional(),
    specie: z.enum(["DOG", "CAT"]).optional(),
    age: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  });

  const { id } = updateParamsSchema.parse(request.params);

  const { name, specie, age, size } = updateBodySchema.parse(request.body);

  const updateService = makeUpdatePetService();

  await updateService.execute({
    id,
    name,
    specie,
    age,
    size,
  });

  return reply.status(204).send();
}
