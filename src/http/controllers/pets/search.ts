import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindPetByCityService } from "@/services/factories/pets/make-search-many-service.js";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchByCityQueryParams = z.object({
    city: z.string(),
    specie: z.enum(["DOG", "CAT"]).optional(),
    age: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  });

  const { city, specie, age, size } = searchByCityQueryParams.parse(request.query);

  const searchByCityService = makeFindPetByCityService();

  const { pets } = await searchByCityService.execute({
    city,
    age,
    size,
    specie,
  });

  return reply.status(200).send({
    pets,
  });
}
