import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository.js";
import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { CreatePetsService } from "@/services/pets/create-pets-service.js";

export function makePetCreateService() {
  const petsRepository = new PrismaPetRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const createPetService = new CreatePetsService(petsRepository, orgsRepository);

  return createPetService;
}
