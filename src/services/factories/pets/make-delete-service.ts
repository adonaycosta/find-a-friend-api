import { PrismaPetRepository } from "@/repositories/pets/prisma-pets-repository.js";
import { DeletePetService } from "@/services/pets/delete-pet-service.js";

export function makeDeletePetService() {
  const petsRepository = new PrismaPetRepository();
  const deletePetService = new DeletePetService(petsRepository);

  return deletePetService;
}
