import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { OrgNotFoundError } from "@/services/errors/org-not-found-error.js";
import { makePetCreateService } from "@/services/factories/pets/make-create-service.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(2),
    specie: z.enum(["DOG", "CAT"]),
    age: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    orgId: z.string(),
  });

  const { name, specie, age, size, orgId } = createPetBodySchema.parse(request.body);

  try {
    const createPetService = makePetCreateService();

    await createPetService.execute({
      name,
      specie,
      age,
      size,
      orgId,
    });
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
  return reply.status(201).send();
}
