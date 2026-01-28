import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface deletePetServiceRequest {
  id: string;
}

export class DeletePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: deletePetServiceRequest): Promise<void> {
    const petExists = await this.petsRepository.findById(id);

    if (!petExists) {
      throw new ResourceNotFoundError();
    }

    await this.petsRepository.delete(id);
  }
}
