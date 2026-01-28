import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository.js";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { OrgNotFoundError } from "../errors/org-not-found-error.js";
import { CreatePetsService } from "./create-pets-service.js";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetsService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreatePetsService(petsRepository, orgsRepository);
  });

  it("Should be able to create pet", async () => {
    const org = await orgsRepository.create({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password_hash: "1234567",
      phone: "+14155559877",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    const { pet } = await sut.execute({
      name: "Bob",
      age: "SENIOR",
      size: "LARGE",
      specie: "CAT",
      orgId: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.created_at).toEqual(expect.any(Date));
  });

  it("Should be able to create pet with inexistent orgId", async () => {
    await expect(() =>
      sut.execute({
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: "inexistent-orgId",
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });

  it.each([
    ["Invalid age.", { age: "OLD" }],
    ["Invalid size.", { size: "HUGE" }],
    ["Invalid specie.", { specie: "BIRD" }],
  ])("Should not be able to create pet with %s", async (_, invalidData) => {
    await expect(() =>
      sut.execute({
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: "inexistent-orgId",
        ...invalidData,
      } as any),
    ).rejects.toBeInstanceOf(Error);
  });
});
