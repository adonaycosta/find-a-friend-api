import type { Pet } from "@prisma/client";
import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface updatePetServiceRequest {
  id: string;
  name?: string;
  specie?: "DOG" | "CAT";
  age?: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size?: "SMALL" | "MEDIUM" | "LARGE";
}

interface updatePetServiceResponse {
  pet: Pet;
}

export class UpdatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    age,
    name,
    size,
    specie,
  }: updatePetServiceRequest): Promise<updatePetServiceResponse> {
    const petExists = await this.petsRepository.findById(id);

    if (!petExists) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.update({
      id,
      age,
      name,
      size,
      specie,
    });

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
