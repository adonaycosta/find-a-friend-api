import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { UpdatePetService } from "@/services/pets/update-pet-service.js";

export function makeUpdatePetService() {
  const petsRepository = new PrismaPetRepository();
  const updatePetService = new UpdatePetService(petsRepository);

  return updatePetService;
}
