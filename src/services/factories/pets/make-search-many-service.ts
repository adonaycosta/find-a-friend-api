import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository.js";
import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { FindPetByCityService } from "@/services/pets/find-pet-by-city-service.js";

export function makeFindPetByCityService() {
  const petsRepository = new PrismaPetRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const findByCityService = new FindPetByCityService(petsRepository, orgsRepository);

  return findByCityService;
}
