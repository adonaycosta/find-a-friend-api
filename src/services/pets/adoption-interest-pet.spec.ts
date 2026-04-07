import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository.js";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository.js";
import { GetPetAdoptionContactService } from "./adoption-interest-pet.js";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetAdoptionContactService;

describe("Adoption Interest Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetPetAdoptionContactService(petsRepository, orgsRepository);
  });

  it("Should be able to get whatsapp url to contact org", async () => {
    const orgInCalifornia = await orgsRepository.create({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password_hash: "1234567",
      phone: "+5511999999999",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    const pet = await petsRepository.create({
      name: "Bob",
      age: "SENIOR",
      size: "LARGE",
      specie: "CAT",
      orgId: orgInCalifornia.id,
    });

    const urlContact = await sut.execute({
      id: pet.id,
    });

    const contactLink = new URL(urlContact.whatsAppLink);

    expect(contactLink.origin).toBe("https://wa.me");
    expect(contactLink.pathname).toBe(`/${orgInCalifornia.phone}`);

    const message = contactLink.searchParams.get("text");

    expect(message).toBe(`Hello! i saw the pet ${pet.name}.`);
  });
});
