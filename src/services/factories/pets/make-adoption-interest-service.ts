import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository.js";
import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { GetPetAdoptionContactService } from "@/services/pets/adoption-interest-pet.js";

export function makeGetPetAdoptionContactService() {
  const petsRepository = new PrismaPetRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const getPetAdoptionContactService = new GetPetAdoptionContactService(
    petsRepository,
    orgsRepository,
  );

  return getPetAdoptionContactService;
}
