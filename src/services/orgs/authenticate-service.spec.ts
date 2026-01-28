import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository.js";
import { InvalidCredentialsError } from "../errors/invalid-credentials-erros.js";
import { AuthenticateService } from "./authenticate-service.js";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateService;

describe("Authenticate Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateService(orgsRepository);
  });

  it("Should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password_hash: await hash("1234567", 6),
      phone: "+14155559877",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    const { org } = await sut.execute({
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it.each([
    ["invalid email", { email: "wrong@email.com" }],
    ["invalid password", { password: "wrong-password" }],
  ])("Should not be able to authenticate with %s", async (_, invalidCredentials) => {
    await expect(
      sut.execute({
        email: "adoptions@goldenpawscats.org",
        password: "1234567",
        ...invalidCredentials,
      } as any),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
