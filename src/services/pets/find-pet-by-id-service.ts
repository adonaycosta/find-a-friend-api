import type { Pet } from "@prisma/client";
import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

export interface findPetByIdServiceRequest {
  id: string;
}

export interface findPetByIdServiceResponse {
  pet: Pet;
}

export class FindPetByIdService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: findPetByIdServiceRequest): Promise<findPetByIdServiceResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
