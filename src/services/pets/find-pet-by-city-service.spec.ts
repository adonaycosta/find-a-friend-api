import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository.js";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { CityIsRequiredError } from "../errors/city-required-error.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import { FindPetByCityService } from "./find-pet-by-city-service.js";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindPetByCityService;

describe("Find Pet By City Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FindPetByCityService(petsRepository, orgsRepository);
  });

  it("Should be able to find pets by city", async () => {
    const orgInCalifornia = await orgsRepository.create({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password_hash: "1234567",
      phone: "+14155559877",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    for (let i = 0; i < 2; i++) {
      await petsRepository.create({
        name: `Bob ${i}`,
        age: "SENIOR",
        size: "MEDIUM",
        specie: "CAT",
        orgId: orgInCalifornia.id,
      });
    }

    const { pets } = await sut.execute({
      city: "San Francisco",
      size: "MEDIUM",
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Bob 0" }),
        expect.objectContaining({ name: "Bob 1" }),
      ]),
    );
  });

  it("Should be able return empty [] with not found city", async () => {
    const { pets } = await sut.execute({
      city: "Not found city",
    });

    expect(pets).toEqual([]);
  });

  it("Should not be able to find pet without city", async () => {
    await expect(
      sut.execute({
        city: "  ",
        size: "MEDIUM",
      }),
    ).rejects.toBeInstanceOf(CityIsRequiredError);
  });
});
