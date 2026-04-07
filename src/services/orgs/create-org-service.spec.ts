import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository.js";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error.js";
import { InvalidPhoneNumber } from "../errors/invalid-phone-number.js";
import { CreateOrgService } from "./create-org-service.js";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgService;

describe("Create Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  it("Should be able to create org", async () => {
    const { org } = await sut.execute({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
      phone: "+55(11)999999999",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.created_at).toEqual(expect.any(Date));
  });

  it("Should be able to create a hash password", async () => {
    const { org } = await sut.execute({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
      phone: "+55(11)999999999",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    const passwordIsHashed = await compare("1234567", org.password_hash);

    expect(passwordIsHashed).toBe(true);
  });

  it("Should be able to create org and format phone number.", async () => {
    const { org } = await sut.execute({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
      phone: "55(11)999999999",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.phone).toBe("5511999999999");
  });

  it("Should not be able to create org with invalid phone number.", async () => {
    await expect(
      sut.execute({
        name: "Golden Paws Cat Rescue",
        email: "adoptions@goldenpawscats.org",
        password: "1234567",
        phone: "(11)99999999",
        street: "780 Valencia Street",
        city: "San Francisco",
        state: "CA",
      }),
    ).rejects.toBeInstanceOf(InvalidPhoneNumber);
  });

  it("Should not be able register with same email", async () => {
    await sut.execute({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
      phone: "+55(11)999999999",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    await expect(() =>
      sut.execute({
        name: "Golden Paws Cat Rescue",
        email: "adoptions@goldenpawscats.org",
        password: "1234567",
        phone: "+55(11)999999999",
        street: "780 Valencia Street",
        city: "San Francisco",
        state: "CA",
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
