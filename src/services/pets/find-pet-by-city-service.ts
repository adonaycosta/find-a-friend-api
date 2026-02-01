import type { Pet } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import type { OrgsRepository } from "@/repositories/orgs/orgs-repository.js";
import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { CityIsRequiredError } from "../errors/city-required-error.js";

export interface findPetQueryParams {
  city: string;
  specie?: "DOG" | "CAT";
  age?: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size?: "SMALL" | "MEDIUM" | "LARGE";
}

export interface findPetByCityServiceResponse {
  pets: Pet[];
}

export class FindPetByCityService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    specie,
    age,
    size,
  }: findPetQueryParams): Promise<findPetByCityServiceResponse> {
    if (!city.trim()) {
      throw new CityIsRequiredError();
    }

    const orgs = await this.orgsRepository.findManyByCity(city);

    if (orgs.length === 0) {
      return {
        pets: [],
      };
    }

    const pets = await this.petsRepository.searchMany({
      orgIds: orgs.map((org) => org.id),
      age,
      size,
      specie,
    });

    return {
      pets,
    };
  }
}
