import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import { UpdatePetService } from "./update-pet-service.js";

let petsRepository: InMemoryPetsRepository;
let sut: UpdatePetService;

describe("Update Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new UpdatePetService(petsRepository);
  });

  it("Should be able to update pet", async () => {
    const createdPet = await petsRepository.create({
      name: "Bob",
      age: "SENIOR",
      size: "LARGE",
      specie: "CAT",
      orgId: randomUUID(),
    });
    const { pet } = await sut.execute({
      id: createdPet.id,
      age: "ADULT",
    });

    expect(pet.age).toBe("ADULT");
  });

  it("Should not be able to find pet by inexistent id", async () => {
    await expect(() =>
      sut.execute({
        id: "inexistent-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
