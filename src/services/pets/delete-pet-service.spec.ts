import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import { DeletePetService } from "./delete-pet-service.js";

let petsRepository: InMemoryPetsRepository;
let sut: DeletePetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new DeletePetService(petsRepository);
  });

  it("Should be able to delete pet", async () => {
    const pet = await petsRepository.create({
      name: "Bob",
      age: "SENIOR",
      size: "LARGE",
      specie: "CAT",
      orgId: randomUUID(),
    });

    await sut.execute({
      id: pet.id,
    });

    const petExistsAfterDelete = await petsRepository.findById(pet.id);

    expect(petExistsAfterDelete).toBeNull();
  });

  it("Should not be able to delete pet with inexistent id", async () => {
    await expect(
      sut.execute({
        id: "inexistent-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
