import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org-tests.js";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create pet", async () => {
    const { sanFranciscoOrg, sanFranciscoOrgAuthToken } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${sanFranciscoOrgAuthToken}`)
      .send({
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: sanFranciscoOrg.id,
      });

    expect(response.statusCode).toEqual(201);
  });
});
