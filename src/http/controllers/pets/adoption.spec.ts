import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org-tests.js";

describe("Find Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able generate a whatsapp link with correct phone and message", async () => {
    const { sanFranciscoOrg, sanFranciscoOrgAuthToken } = await createAndAuthenticateOrg(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${sanFranciscoOrgAuthToken}`)
      .send({
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: sanFranciscoOrg.id,
      });

    const pet = await prisma.pet.findFirstOrThrow();

    const response = await request(app.server).get(`/pets/${pet.id}/adoption`).send();

    expect(response.statusCode).toEqual(200);

    const contactLink = new URL(response.body.whatsAppLink);

    expect(contactLink.origin).toBe("https://wa.me");
    expect(contactLink.pathname).toBe(`/${sanFranciscoOrg.phone}`);

    const message = contactLink.searchParams.get("text");

    expect(message).toBe(`Hello! i saw the pet ${pet.name}.`);
  });
});
