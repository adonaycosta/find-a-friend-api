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
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async searchMany(query: searchPetsQueryParams) {
    const pets = await prisma.pet.findMany({
      where: {
        orgId: { in: query.orgIds },
        age: query.age,
        size: query.size,
        specie: query.specie,
      },
    });

    return pets;
  }

  async update(data: updatePetData) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    });

    return pet;
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
