import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import { FindPetByIdService } from "./find-pet-by-id-service.js";

let petsRepository: InMemoryPetsRepository;
let sut: FindPetByIdService;

describe("Find Pet By ID Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FindPetByIdService(petsRepository);
  });

  it("Should be able to find pet by id", async () => {
    const createdPet = await petsRepository.create({
      name: "Bob",
      age: "SENIOR",
      size: "LARGE",
      specie: "CAT",
      orgId: randomUUID(),
    });

    const { pet } = await sut.execute({
      id: createdPet.id,
    });

    expect(pet).not.toBe(null);
    expect(pet.name).toBe("Bob");
  });

  it("Should not be able to find pet by inexistent id", async () => {
    await expect(() =>
      sut.execute({
        id: "inexistent-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
