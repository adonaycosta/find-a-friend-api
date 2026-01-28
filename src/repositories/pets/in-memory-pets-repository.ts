import { randomUUID } from "node:crypto";
import type { Pet } from "@prisma/client";
import type {
  createPetData,
  PetsRepository,
  searchPetsQueryParams,
  updatePetData,
} from "./pets-repository.js";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: createPetData) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      specie: data.specie,
      orgId: data.orgId,
      created_at: new Date(),
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async searchMany(query: searchPetsQueryParams) {
    const pets = this.pets.filter((pet) => {
      if (!query.orgIds.includes(pet.orgId)) {
        return false;
      }

      if (query.age && pet.age !== query.age) {
        return false;
      }

      if (query.size && pet.size !== query.size) {
        return false;
      }

      if (query.specie && pet.specie !== query.specie) {
        return false;
      }

      return true;
    });

    return pets;
  }

  async update(data: updatePetData) {
    const pet = this.pets.find((pet) => pet.id === data.id);

    if (!pet) {
      return null;
    }

    if (data.name && data.name !== pet?.name) {
      pet.name = data.name;
    }

    if (data.specie && data.specie !== pet?.specie) {
      pet.specie = data.specie;
    }

    if (data.age && data.age !== pet?.age) {
      pet.age = data.age;
    }

    if (data.size && data.size !== pet?.size) {
      pet.size = data.size;
    }

    return pet;
  }

  async delete(id: string) {
    const index = this.pets.findIndex((pet) => pet.id === id);

    if (index === -1) {
      return;
    }

    this.pets.splice(index, 1);
  }
}
