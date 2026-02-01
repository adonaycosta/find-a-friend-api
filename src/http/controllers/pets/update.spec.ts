import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org-tests.js";

describe("Update Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to update pet", async () => {
    const { austinOrg, austinoOrgAuthToken } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: {
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: austinOrg.id,
      },
    });

    const response = await request(app.server)
      .patch(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${austinoOrgAuthToken}`)
      .send({
        name: "John",
      });

    const updatedPet = await prisma.pet.findUnique({
      where: {
        id: pet.id,
      },
    });

    expect(response.statusCode).toEqual(204);
    expect(updatedPet!.name).toBe("John");
  });
});
