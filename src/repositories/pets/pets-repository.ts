import type { Pet } from "@prisma/client";

export interface createPetData {
  name: string;
  specie: "DOG" | "CAT";
  age: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size: "SMALL" | "MEDIUM" | "LARGE";
  orgId: string;
}

export interface searchPetsQueryParams {
  specie?: "DOG" | "CAT";
  age?: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size?: "SMALL" | "MEDIUM" | "LARGE";
  orgIds: string[];
}

export interface updatePetData {
  id: string;
  name?: string;
  specie?: "DOG" | "CAT";
  age?: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size?: "SMALL" | "MEDIUM" | "LARGE";
}

export interface PetsRepository {
  create(data: createPetData): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  searchMany(query: searchPetsQueryParams): Promise<Pet[]>;
  update(data: updatePetData): Promise<Pet | null>;
  delete(id: string): Promise<void>;
}
