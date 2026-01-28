import { prisma } from "@/lib/prisma.js";
import type {
  createPetData,
  PetsRepository,
  searchPetsQueryParams,
  updatePetData,
} from "./pets-repository.js";

export class PrismaPetRepository implements PetsRepository {
  async create(data: createPetData) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    throw new Error("Method not implemented.");
  }

  async searchMany(query: searchPetsQueryParams) {
    throw new Error("Method not implemented.");
  }
  async update(data: updatePetData) {
    throw new Error("Method not implemented.");
  }
  async delete(id: string) {
    throw new Error("Method not implemented.");
  }
}
