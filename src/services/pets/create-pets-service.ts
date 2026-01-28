import type { Pet } from "@prisma/client";
import type { OrgsRepository } from "@/repositories/orgs/orgs-repository.js";
import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { OrgNotFoundError } from "../errors/org-not-found-error.js";

export type createPetServiceRequest = {
  name: string;
  specie: "DOG" | "CAT";
  age: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size: "SMALL" | "MEDIUM" | "LARGE";
  orgId: string;
};

export interface createPetServiceResponse {
  pet: Pet;
}

export class CreatePetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    size,
    specie,
    orgId,
  }: createPetServiceRequest): Promise<createPetServiceResponse> {
    const orgExists = await this.orgsRepository.findById(orgId);

    if (!orgExists) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      size,
      specie,
      orgId,
    });

    return {
      pet,
    };
  }
}
