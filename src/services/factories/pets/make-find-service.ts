import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { FindPetByIdService } from "@/services/pets/find-pet-by-id-service.js";

export function makeFindPetService() {
  const petsRepository = new PrismaPetRepository();
  const findPetService = new FindPetByIdService(petsRepository);

  return findPetService;
}
